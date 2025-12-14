import { HeaderBackButton } from '@react-navigation/elements';
import React from 'react';
import { ActivityIndicator, Platform, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BottomSheet, Touchable, UserDetailsCard } from '../../global/components';
import { colors } from '../../global/constants';

import { useProfileScreen } from '../hooks';

export function ProfileScreen() {
  const {
    canGoBack,
    goBack,
    popToTop,
    userData,
    isLoading,
    isMenuVisible,
    openMenu,
    closeMenu,
    menuOptions,
    contactItems,
  } = useProfileScreen();

  if (isLoading) {
    return <ActivityIndicator size="large" color={colors.primary} />;
  }

  if (!userData) {
    popToTop();
    return;
  }

  const { avatar, name, username } = userData;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          {canGoBack() && <HeaderBackButton onPress={goBack} tintColor={colors.textPrimary} />}
        </View>
        <Touchable style={styles.menuButton} type="circle" onPress={openMenu}>
          <Text style={styles.menuIcon}>⋯</Text>
        </Touchable>
      </View>
      <View style={styles.content}>
        <UserDetailsCard
          avatar={avatar}
          name={name}
          username={username}
          contactItems={contactItems}
        />
      </View>
      <BottomSheet visible={isMenuVisible} onClose={closeMenu} options={menuOptions} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surface,
    paddingTop: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: 16,
    ...Platform.select({
      ios: {
        paddingLeft: 16,
      },
    }),
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuButton: {
    padding: 8,
  },
  menuIcon: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.textPrimary,
    transform: [{ rotate: '90deg' }],
    borderRadius: 12,
  },
  content: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
