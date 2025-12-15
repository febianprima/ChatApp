import { useMemo, useRef } from 'react';

import { useGlobalStore } from '../../global/store';

import useGetUserPosts from '../queries/useGetUserPosts';
import { useChatStore } from '../store/useChatStore';

const NEW_MESSAGE_THRESHOLD_MS = 2000; // Messages less than 2 seconds old are "new"

export interface ChatMessage extends chat.Post {
  isOwn: boolean;
  isNew?: boolean;
}

export interface DateSeparatorItem {
  type: 'separator';
  id: string;
  label: string;
}

export type ChatListItem = (ChatMessage & { type: 'message' }) | DateSeparatorItem;

/**
 * Get date label for grouping
 */
function getDateLabel(date: Date): string {
  const now = new Date();
  const startOfToday = new Date(now);
  startOfToday.setHours(0, 0, 0, 0);

  const startOfYesterday = new Date(startOfToday);
  startOfYesterday.setDate(startOfYesterday.getDate() - 1);

  if (date >= startOfToday) {
    return 'Today';
  }

  if (date >= startOfYesterday) {
    return 'Yesterday';
  }

  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(date);
}

/**
 * Get date key for grouping (YYYY-MM-DD)
 */
function getDateKey(date: Date): string {
  return date.toISOString().split('T')[0];
}

export function useChatRoomMessages() {
  const { userId: authenticatedUserId } = useGlobalStore();
  const { selectedContactUser, sentMessagesByUser } = useChatStore();

  const contactUserId = selectedContactUser?.id ?? 0;

  // Track which message IDs have already been rendered (to avoid re-animating)
  const seenMessageIds = useRef<Set<number>>(new Set());

  // Fetch posts from contact user
  const { data: contactPostsData, isLoading: isContactPostsLoading } = useGetUserPosts({
    userId: contactUserId,
  });

  // Fetch posts from authenticated user
  const { data: ownPostsData, isLoading: isOwnPostsLoading } = useGetUserPosts({
    userId: authenticatedUserId ?? 0,
  });

  // Combine, sort, and group messages by date
  const items: ChatListItem[] = useMemo(() => {
    const contactPosts = contactPostsData?.results ?? [];
    const ownPosts = ownPostsData?.results ?? [];

    // Get persisted sent messages for current authenticated user
    const persistedOwnMessages = authenticatedUserId
      ? (sentMessagesByUser[authenticatedUserId] ?? [])
      : [];

    // Get persisted sent messages for contact user
    const persistedContactMessages = contactUserId ? (sentMessagesByUser[contactUserId] ?? []) : [];

    // Merge API posts with persisted sent messages (dedupe by id)
    const ownPostIds = new Set(ownPosts.map(p => p.id));
    const uniquePersistedOwnMessages = persistedOwnMessages.filter(m => !ownPostIds.has(m.id));
    const allOwnPosts = [...uniquePersistedOwnMessages, ...ownPosts];

    // Merge contact posts with persisted contact messages (dedupe by id)
    const contactPostIds = new Set(contactPosts.map(p => p.id));
    const uniquePersistedContactMessages = persistedContactMessages.filter(
      m => !contactPostIds.has(m.id),
    );
    const allContactPosts = [...uniquePersistedContactMessages, ...contactPosts];

    const now = Date.now();
    const allMessages: ChatMessage[] = [
      ...allContactPosts.map(post => ({
        ...post,
        isOwn: false,
        isNew:
          !seenMessageIds.current.has(post.id) &&
          now - new Date(post.createdAt).getTime() < NEW_MESSAGE_THRESHOLD_MS,
      })),
      ...allOwnPosts.map(post => ({
        ...post,
        isOwn: true,
        isNew:
          !seenMessageIds.current.has(post.id) &&
          now - new Date(post.createdAt).getTime() < NEW_MESSAGE_THRESHOLD_MS,
      })),
    ];

    // Update seen message IDs
    allMessages.forEach(msg => seenMessageIds.current.add(msg.id));

    // Sort by createdAt descending (newest first for inverted FlatList)
    allMessages.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    // Group by date and insert separators
    // Since FlatList is inverted, separators go AFTER messages to appear ABOVE them
    const result: ChatListItem[] = [];

    for (let i = 0; i < allMessages.length; i++) {
      const message = allMessages[i];
      const messageDate = new Date(message.createdAt);
      const dateKey = getDateKey(messageDate);

      result.push({ ...message, type: 'message' });

      // Check if next message is a different date (or this is the last message)
      const nextMessage = allMessages[i + 1];
      const nextDateKey = nextMessage ? getDateKey(new Date(nextMessage.createdAt)) : null;

      // Insert date separator after the last message of each date group
      if (dateKey !== nextDateKey) {
        result.push({
          type: 'separator',
          id: `separator-${dateKey}`,
          label: getDateLabel(messageDate),
        });
      }
    }

    return result;
  }, [contactPostsData, ownPostsData, sentMessagesByUser, authenticatedUserId, contactUserId]);

  const isLoading = isContactPostsLoading || isOwnPostsLoading;

  return {
    items,
    isLoading,
    contactUser: selectedContactUser,
  };
}
