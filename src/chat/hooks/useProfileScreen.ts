import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useCallback, useMemo, useState } from 'react';
import { Alert, Linking } from 'react-native';

import useGetUser from '../queries/useGetUser';
import { useChatStore } from '../store/useChatStore';

export function useProfileScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<chat.ChatStackParamList>>();
  const { canGoBack, goBack, popToTop, replace } = navigation;
  const { blockedUsers, blockUser, unblockUser } = useChatStore();

  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const { data: userData, isLoading } = useGetUser();

  // Menu handlers
  const openMenu = useCallback(() => setIsMenuVisible(true), []);
  const closeMenu = useCallback(() => setIsMenuVisible(false), []);

  // Contact action handlers
  const handlePressEmail = useCallback(() => {
    if (userData?.email) {
      Linking.openURL(`mailto:${userData.email}`);
    }
  }, [userData?.email]);

  const handlePressPhone = useCallback(() => {
    if (userData?.phone) {
      Linking.openURL(`https://wa.me/${userData.phone}`);
    }
  }, [userData?.phone]);

  const handlePressWebsite = useCallback(() => {
    if (userData?.website) {
      Linking.openURL(userData.website);
    }
  }, [userData?.website]);

  // Contact items for display
  const contactItems: chat.ContactItem[] = useMemo(() => {
    if (!userData) return [];
    return [
      { icon: '📞', value: userData.phone, onPress: handlePressPhone },
      { icon: '✉️', value: userData.email, onPress: handlePressEmail },
      { icon: '🌐', value: userData.website, onPress: handlePressWebsite },
    ];
  }, [userData, handlePressPhone, handlePressEmail, handlePressWebsite]);

  // Block user handlers
  const handleBlockUserConfirm = useCallback(() => {
    if (userData?.id) {
      blockUser(userData.id);
      Alert.alert('Blocked', 'User has been blocked');
      popToTop();
    }
  }, [userData?.id, blockUser, popToTop]);

  const handleBlockUser = useCallback(() => {
    Alert.alert('Block User', `Are you sure you want to block ${userData?.name}?`, [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Block', style: 'destructive', onPress: handleBlockUserConfirm },
    ]);
  }, [userData?.name, handleBlockUserConfirm]);

  const handleUnblockUser = useCallback(() => {
    if (userData?.id) {
      unblockUser(userData.id);
      Alert.alert('Unblocked', 'User has been unblocked');
      replace('ChatRoom');
    }
  }, [userData?.id, unblockUser, replace]);

  // Menu options
  const menuOptions: global.BottomSheetOption[] = useMemo(() => {
    if (userData?.id && blockedUsers.includes(userData.id)) {
      return [{ icon: '😶‍🌫️', label: 'Unblock User', onPress: handleUnblockUser }];
    }
    return [{ icon: '🚫', label: 'Block User', onPress: handleBlockUser, destructive: true }];
  }, [userData?.id, blockedUsers, handleBlockUser, handleUnblockUser]);

  return {
    // Navigation
    canGoBack,
    goBack,
    popToTop,

    // User data
    userData,
    isLoading,

    // Menu state
    isMenuVisible,
    openMenu,
    closeMenu,
    menuOptions,

    // Contact items
    contactItems,
  };
}
