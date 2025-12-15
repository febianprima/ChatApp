import React, { useCallback, useMemo, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import DeviceInfo from 'react-native-device-info';

import useGetUser from '../../chat/queries/useGetUser';
import useGetUsers from '../../chat/queries/useGetUsers';
import {
  BottomSheet,
  Touchable,
  UserDetailsCard,
  UserDetailsCardSkeleton,
} from '../../global/components';
import { colors } from '../../global/constants';
import { useGlobalStore } from '../../global/store';

export function SettingsScreen() {
  const { userId, setUserId } = useGlobalStore();
  const { data: userData, isLoading } = useGetUser({ isAuthenticatedUser: true });
  const { data: usersData } = useGetUsers({ includeCurrentUser: true });
  const [isUserPickerVisible, setIsUserPickerVisible] = useState(false);

  const openUserPicker = useCallback(() => setIsUserPickerVisible(true), []);
  const closeUserPicker = useCallback(() => setIsUserPickerVisible(false), []);

  const userOptions: global.BottomSheetOption[] = useMemo(
    () =>
      usersData?.results.map(user => ({
        avatar: user.avatar,
        label: user.name,
        subtitle: user.id === userId ? 'Current user' : `@${user.username}`,
        onPress: () => setUserId(user.id),
      })) ?? [],
    [usersData, userId, setUserId],
  );

  if (isLoading) {
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <UserDetailsCardSkeleton showContactItems={false} />
        </View>
      </View>
    );
  }

  if (!userData) {
    return null;
  }

  const { name, username, avatar } = userData;

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <UserDetailsCard avatar={avatar} name={name} username={username} />
        <Touchable onPress={openUserPicker} style={styles.switchUserButton}>
          <Text style={styles.switchUserText}>Switch User</Text>
        </Touchable>
        <Text style={styles.version}>
          Version {DeviceInfo.getVersion()} ({DeviceInfo.getBuildNumber()})
        </Text>
      </View>
      <BottomSheet
        visible={isUserPickerVisible}
        onClose={closeUserPicker}
        options={userOptions}
        title="Select User"
        maxHeightRatio={0.6}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  content: {
    flex: 1,
    gap: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  switchUserButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: colors.primary,
    borderRadius: 8,
  },
  switchUserText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.white,
  },
  version: {
    fontSize: 12,
    color: colors.textTertiary,
    textAlign: 'center',
    paddingBottom: 24,
  },
});
