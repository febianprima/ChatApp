import { useMutation } from '@tanstack/react-query';

import { queryClient } from '../../global/config';
import { BASE_URL } from '../../global/constants';

import { useChatStore } from '../store';

const postChatMessage = async (chatMessage: Omit<chat.PostMessage, 'title'>) => {
  if (!chatMessage.userId) {
    throw new Error('User ID is required');
  }
  if (!chatMessage.body) {
    throw new Error('Body is required');
  }

  const response = await fetch(`${BASE_URL}/posts`, {
    method: 'POST',
    body: JSON.stringify({ ...chatMessage, title: 'New Message' }),
  });

  if (!response.ok) {
    throw new Error('Failed to post chat message');
  }

  return response.json();
};

// Generate unique local ID for sent messages
const generateLocalId = () => Date.now() + Math.floor(Math.random() * 10000);

export function usePostChatMessage() {
  const { mutate, isPending } = useMutation({
    mutationFn: (chatMessage: Omit<chat.PostMessage, 'title'>) => postChatMessage(chatMessage),
    onSuccess: (newPost: chat.Post, { userId }) => {
      // Create message with unique local ID to avoid key conflicts
      const messageWithLocalId: chat.Post = {
        ...newPost,
        id: generateLocalId(),
      };

      // Add to persisted store (keyed by userId)
      useChatStore.getState().addSentMessage(userId, messageWithLocalId);

      // Also update react-query cache for immediate UI update
      queryClient.setQueryData(
        ['userPosts', userId],
        (old: chat.FetchPostsResponse | undefined) => {
          if (!old) {
            return { results: [messageWithLocalId], total: 1, offset: 0, limit: 10 };
          }
          return {
            ...old,
            results: [messageWithLocalId, ...old.results],
            total: old.total + 1,
          };
        },
      );
    },
  });

  return { mutate, isPending };
}
