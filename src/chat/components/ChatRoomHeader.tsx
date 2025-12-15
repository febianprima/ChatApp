import { HeaderBackButton } from '@react-navigation/elements';
import { NativeStackHeaderProps } from '@react-navigation/native-stack';
import React from 'react';
import { Platform, Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { colors } from '../../global/constants';

import { useGetUser } from '../queries';

import { ChatRoomHeaderSkeleton } from './ChatRoomHeaderSkeleton';
import { UserProfile } from './UserProfile';

export function ChatRoomHeader({ navigation }: NativeStackHeaderProps) {
  const { data: userData, isLoading: isUserDataLoading } = useGetUser();

  const { top } = useSafeAreaInsets();
  const { canGoBack, goBack, navigate } = navigation;

  const handleBack = () => {
    goBack();
  };

  const handleProfilePress = () => {
    navigate('Profile');
  };

  if (isUserDataLoading) {
    return <ChatRoomHeaderSkeleton navigation={navigation} />;
  }

  if (!userData) {
    goBack();
    return;
  }

  const { id, name, username, avatar } = userData;

  return (
    <View style={[styles.container, { paddingTop: top + 16 }]}>
      {canGoBack() && <HeaderBackButton onPress={handleBack} tintColor={colors.textPrimary} />}
      <Pressable onPress={handleProfilePress}>
        <UserProfile id={id} avatar={avatar} name={name} username={username} size="small" />
      </Pressable>
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
});
