import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';

import { Shimmer } from './Shimmer';

interface UserDetailsCardSkeletonProps {
  showContactItems?: boolean;
  contactItemsCount?: number;
  style?: ViewStyle;
}

export function UserDetailsCardSkeleton({
  showContactItems = true,
  contactItemsCount = 3,
  style,
}: UserDetailsCardSkeletonProps) {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.profile}>
        <Shimmer width={100} height={100} shape="circle" />
        <Shimmer width={160} height={24} shape="rounded" />
        <Shimmer width={100} height={16} shape="rounded" />
      </View>
      {showContactItems && (
        <View style={styles.details}>
          {Array.from({ length: contactItemsCount }).map((_, index) => (
            <View key={index} style={styles.detailItem}>
              <Shimmer width={20} height={20} shape="rounded" />
              <Shimmer width={180} height={16} shape="rounded" />
            </View>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profile: {
    gap: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  details: {
    gap: 16,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
});
