import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text } from 'react-native';

import { colors } from '../../global/constants';

export function NewChatButton() {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Continuous pulse animation
    const pulseAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ]),
    );

    pulseAnimation.start();

    return () => {
      pulseAnimation.stop();
    };
  }, [scaleAnim]);

  return (
    <Animated.View
      style={[
        styles.button,
        {
          transform: [{ scale: scaleAnim }],
        },
      ]}>
      <Text style={styles.icon}>{'💬 Start new chat now!'}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: colors.background,
    shadowColor: colors.accent,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  icon: {
    fontSize: 10,
  },
});
