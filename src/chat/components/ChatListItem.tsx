import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { memo } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Shimmer, Touchable } from '../../global/components';
import { colors } from '../../global/constants';
import { useFormatDate } from '../../global/hooks';

import useGetUserPosts from '../queries/useGetUserPosts';
import { useChatStore } from '../store/useChatStore';

import { ChatListItemContentSkeleton } from './ChatListItemContentSkeleton';
import { UserProfile } from './UserProfile';

interface ChatListItemProps {
  data: chat.User;
}

const ChatListItem = memo(({ data }: ChatListItemProps) => {
  const navigation = useNavigation<NativeStackNavigationProp<chat.ChatStackParamList>>();
  const formatDate = useFormatDate();
  const { id: userId, name, username, avatar } = data;

  const { lastPost, isLoading } = useGetUserPosts({ userId });
  const { setSelectedContactUser } = useChatStore();

  const handlePress = () => {
    setSelectedContactUser(data);
    navigation.navigate('ChatRoom');
  };

  // Show skeleton while loading
  if (isLoading) {
    return (
      <View style={styles.container}>
        <UserProfile
          avatar={avatar}
          name={name}
          username={username}
          lastSeenDate={<Shimmer width={80} height={14} />}
        />
        <ChatListItemContentSkeleton />
      </View>
    );
  }

  // Hide if no posts after loading
  if (!lastPost) {
    return null;
  }

  const { title, body, createdAt } = lastPost;

  return (
    <Touchable onPress={handlePress} style={styles.container}>
      <UserProfile
        avatar={avatar}
        name={name}
        username={username}
        lastSeenDate={formatDate(createdAt)}
      />
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.body} numberOfLines={2}>
          {body}
        </Text>
      </View>
    </Touchable>
  );
});

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: colors.surface,
    gap: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  content: {
    gap: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  body: {
    fontSize: 14,
    color: colors.textSecondary,
  },
});

export default ChatListItem;
