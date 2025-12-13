import React from 'react';
import { StyleSheet, View } from 'react-native';

import { Shimmer } from '../../global/components';

export function ChatListItemContentSkeleton() {
  return (
    <View style={styles.content}>
      <Shimmer width="50%" height={16} />
      <View style={styles.body}>
        <Shimmer width="80%" height={14} />
        <Shimmer width="60%" height={14} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: 8,
  },
  body: {
    gap: 4,
  },
});

