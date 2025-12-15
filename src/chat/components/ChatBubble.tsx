import React, { memo, useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text } from 'react-native';

import { colors } from '../../global/constants';
import { useFormatDate } from '../../global/hooks';

const ANIMATION_DURATION = 300;
const SLIDE_DISTANCE = 50;

interface ChatBubbleProps {
  post: chat.Post;
  isOwn: boolean;
  isNew?: boolean;
}

export const ChatBubble = memo(({ post, isOwn, isNew = false }: ChatBubbleProps) => {
  const formatDate = useFormatDate();
  const { body, createdAt } = post;

  const slideAnim = useRef(
    new Animated.Value(isNew ? (isOwn ? SLIDE_DISTANCE : -SLIDE_DISTANCE) : 0),
  ).current;
  const opacityAnim = useRef(new Animated.Value(isNew ? 0 : 1)).current;
  const scaleAnim = useRef(new Animated.Value(isNew ? 0.8 : 1)).current;

  useEffect(() => {
    if (isNew) {
      Animated.parallel([
        Animated.spring(slideAnim, {
          toValue: 0,
          useNativeDriver: true,
          tension: 50,
          friction: 8,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: ANIMATION_DURATION,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          useNativeDriver: true,
          tension: 50,
          friction: 8,
        }),
      ]).start();
    }
  }, [isNew, slideAnim, opacityAnim, scaleAnim]);

  return (
    <Animated.View
      style={[
        styles.container,
        isOwn ? styles.containerOwn : styles.containerOther,
        {
          opacity: opacityAnim,
          transform: [{ translateX: slideAnim }, { scale: scaleAnim }],
        },
      ]}>
      <Animated.View style={[styles.bubble, isOwn ? styles.bubbleOwn : styles.bubbleOther]}>
        <Text style={[styles.body, isOwn && styles.bodyOwn]}>{body}</Text>
        <Text style={[styles.time, isOwn && styles.timeOwn]}>{formatDate(createdAt)}</Text>
      </Animated.View>
    </Animated.View>
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
