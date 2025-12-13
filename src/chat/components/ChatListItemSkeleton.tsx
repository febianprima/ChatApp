import React from 'react';
import { StyleSheet, View } from 'react-native';

import { Shimmer } from '../../global/components';
import { colors } from '../../global/constants';

import { ChatListItemContentSkeleton } from './ChatListItemContentSkeleton';

export function ChatListItemSkeleton() {
  return (
    <View style={styles.container}>
      {/* Profile section */}
      <View style={styles.profile}>
        <Shimmer width={40} height={40} shape="circle" />
        <View style={styles.info}>
          <Shimmer width={120} height={16} style={styles.nameShimmer} />
          <Shimmer width={80} height={14} />
        </View>
      </View>
      {/* Content section */}
      <ChatListItemContentSkeleton />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    backgroundColor: colors.surface,
    gap: 16,
  },
  profile: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  info: {
    marginLeft: 16,
  },
  nameShimmer: {
    marginBottom: 4,
  },
});
