import { HeaderBackButton } from '@react-navigation/elements';
import { NativeStackHeaderProps } from '@react-navigation/native-stack';
import React from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Shimmer } from '../../global/components';
import { colors } from '../../global/constants';

function ChatRoomHeaderSkeleton({
  navigation,
}: {
  navigation: NativeStackHeaderProps['navigation'];
}) {
  const { top } = useSafeAreaInsets();
  const { canGoBack, goBack } = navigation;
  const handleBack = () => {
    goBack();
  };
  return (
    <View style={[styles.container, { paddingTop: top + 16 }]}>
      {canGoBack() && <HeaderBackButton onPress={handleBack} tintColor={colors.textPrimary} />}
      <View style={styles.profile}>
        <Shimmer width={40} height={40} shape="circle" />
        <View>
          <Shimmer width={120} height={16} />
          <Shimmer width={80} height={12} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 16,
    backgroundColor: colors.background,
    ...Platform.select({
      ios: {
        paddingLeft: 16,
      },
    }),
  },
  profile: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
});

export default ChatRoomHeaderSkeleton;
