import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { memo } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

import { Shimmer, Touchable } from '../../global/components';
import { colors } from '../../global/constants';
import { formatDate } from '../../global/utils';
import { ChatStackParamList } from '../navigation/ChatStackNavigator';

import useGetUserPosts from '../queries/useGetUserPosts';

import { ChatListItemContentSkeleton } from './ChatListItemContentSkeleton';

interface ChatListItemProps {
  data: chat.User;
}

const ChatListItem = memo(({ data }: ChatListItemProps) => {
  const navigation = useNavigation<NativeStackNavigationProp<ChatStackParamList>>();
  const { id: userId, name, avatar } = data;

  const { lastPost, isLoading } = useGetUserPosts({ userId });

  const handlePress = () => {
    navigation.navigate('Chat', { userId });
  };

  // Show skeleton while loading
  if (isLoading) {
    return (
      <View style={styles.container}>
        <View style={styles.profile}>
          <Image source={{ uri: avatar }} style={styles.avatar} />
          <View style={styles.info}>
            <Text style={styles.name}>{name}</Text>
            <Shimmer width={80} height={14} />
          </View>
        </View>
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
      <View style={styles.profile}>
        <Image source={{ uri: avatar }} style={styles.avatar} />
        <View style={styles.info}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.date}>{formatDate(createdAt)}</Text>
        </View>
      </View>
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
  profile: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  info: {
    marginLeft: 16,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  date: {
    fontSize: 12,
    color: colors.textSecondary,
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
