import React, { useCallback, useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { colors } from '../constants';
import { useSnackbarStore } from '../store/snackbarStore';

const ANIMATION_DURATION = 200;
const AUTO_HIDE_DURATION = 3000;

function getBackgroundColor(type: global.SnackbarType): string {
  switch (type) {
    case 'success':
      return colors.accent;
    case 'error':
      return colors.error;
    case 'info':
    default:
      return colors.textPrimary;
  }
}

export function Snackbar() {
  const { visible, message, type, hide } = useSnackbarStore();
  const { top } = useSafeAreaInsets();

  const translateY = useRef(new Animated.Value(-50)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  const animateOut = useCallback(() => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: -50,
        duration: ANIMATION_DURATION,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: ANIMATION_DURATION,
        useNativeDriver: true,
      }),
    ]).start(() => {
      hide();
    });
  }, [translateY, opacity, hide]);

  useEffect(() => {
    if (visible) {
      // Animate in
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: 0,
          duration: ANIMATION_DURATION,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: ANIMATION_DURATION,
          useNativeDriver: true,
        }),
      ]).start();

      // Auto hide after duration
      const timer = setTimeout(() => {
        animateOut();
      }, AUTO_HIDE_DURATION);

      return () => clearTimeout(timer);
    }
  }, [visible, translateY, opacity, animateOut]);

  if (!visible) {
    return null;
  }

  return (
    <View style={[styles.container, { top: Math.max(top, 16) + 48 }]}>
      <Animated.View
        style={[
          styles.pill,
          {
            backgroundColor: getBackgroundColor(type),
            transform: [{ translateY }],
            opacity,
          },
        ]}>
        <Text style={styles.message}>{message}</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
    pointerEvents: 'none',
  },
  pill: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 24,
    shadowColor: colors.textPrimary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  message: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.textOnAccent,
    textAlign: 'center',
  },
});
