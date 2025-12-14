import React, { memo } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { colors } from '../../global/constants';
import { useFormatDate } from '../../global/hooks';

interface ChatBubbleProps {
  post: chat.Post;
  isOwn: boolean;
}

export const ChatBubble = memo(({ post, isOwn }: ChatBubbleProps) => {
  const formatDate = useFormatDate();
  const { title, body, createdAt } = post;

  return (
    <View style={[styles.container, isOwn ? styles.containerOwn : styles.containerOther]}>
      <View style={[styles.bubble, isOwn ? styles.bubbleOwn : styles.bubbleOther]}>
        <Text style={[styles.title, isOwn && styles.titleOwn]}>{title}</Text>
        <Text style={[styles.body, isOwn && styles.bodyOwn]}>{body}</Text>
        <Text style={[styles.time, isOwn && styles.timeOwn]}>{formatDate(createdAt)}</Text>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 4,
  },
  containerOwn: {
    alignItems: 'flex-end',
  },
  containerOther: {
    alignItems: 'flex-start',
  },
  bubble: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 16,
    gap: 4,
  },
  bubbleOwn: {
    backgroundColor: colors.secondaryDark,
    borderBottomRightRadius: 4,
  },
  bubbleOther: {
    backgroundColor: colors.border,
    borderBottomLeftRadius: 4,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  titleOwn: {
    color: colors.white,
  },
  body: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  bodyOwn: {
    color: colors.white,
    opacity: 0.9,
  },
  time: {
    fontSize: 10,
    color: colors.textTertiary,
    alignSelf: 'flex-end',
    marginTop: 4,
  },
  timeOwn: {
    color: colors.white,
    opacity: 0.7,
  },
});
