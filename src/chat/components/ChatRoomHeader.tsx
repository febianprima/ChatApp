import { HeaderBackButton } from '@react-navigation/elements';
import { NativeStackHeaderProps } from '@react-navigation/native-stack';
import React from 'react';
import { Image, Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { colors } from '../../global/constants';
import { useFormatDate } from '../../global/hooks';

import useGetUser from '../queries/useGetUser';
import useGetUserPosts from '../queries/useGetUserPosts';
import { useChatStore } from '../store/useChatStore';

import ChatRoomHeaderSkeleton from './ChatRoomHeaderSkeleton';

function ChatRoomHeader({ navigation }: NativeStackHeaderProps) {
  const formatDate = useFormatDate();
  const { contactUserId } = useChatStore();

  const { data: userData, isLoading: isUserDataLoading } = useGetUser({ userId: contactUserId });
  const { lastPost, isLoading: isPostDataLoading } = useGetUserPosts({ userId: contactUserId });

  const { top } = useSafeAreaInsets();
  const { canGoBack, goBack, navigate } = navigation;

  const handleBack = () => {
    goBack();
  };

  const handleProfilePress = () => {
    navigate('Profile');
  };

  if (isUserDataLoading || isPostDataLoading) {
    return <ChatRoomHeaderSkeleton navigation={navigation} />;
  }

  if (!lastPost || !userData) {
    goBack();
    return;
  }

  const { name, avatar } = userData;
  const { createdAt } = lastPost;

  return (
    <View style={[styles.container, { paddingTop: top + 16 }]}>
      {canGoBack() && <HeaderBackButton onPress={handleBack} tintColor={colors.textPrimary} />}
      <Pressable onPress={handleProfilePress} style={styles.profile}>
        <Image source={{ uri: avatar }} style={styles.avatar} />
        <View>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.date}>{formatDate(createdAt)}</Text>
        </View>
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
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  date: {
    fontSize: 12,
    color: colors.textSecondary,
  },
});

export default ChatRoomHeader;
