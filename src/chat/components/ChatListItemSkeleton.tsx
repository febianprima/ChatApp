import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';

import { colors } from '../../global/constants';

export function ChatListItemSkeleton() {
  const opacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.3,
          duration: 800,
          useNativeDriver: true,
        }),
      ]),
    );
    animation.start();
    return () => animation.stop();
  }, [opacity]);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.avatar, { opacity }]} />
      <View style={styles.info}>
        <Animated.View style={[styles.name, { opacity }]} />
        <Animated.View style={[styles.email, { opacity }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    backgroundColor: colors.surface,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.border,
  },
  info: {
    marginLeft: 16,
    flex: 1,
  },
  name: {
    width: '60%',
    height: 16,
    borderRadius: 4,
    backgroundColor: colors.border,
    marginBottom: 8,
  },
  email: {
    width: '80%',
    height: 14,
    borderRadius: 4,
    backgroundColor: colors.borderLight,
  },
});
