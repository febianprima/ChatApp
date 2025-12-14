import { HeaderBackButton } from '@react-navigation/elements';
import React from 'react';
import { ActivityIndicator, Image, Platform, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BottomSheet, Touchable } from '../../global/components';
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
        <View style={styles.profile}>
          <Image source={{ uri: avatar }} style={styles.avatar} />
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.username}>{`@${username}`}</Text>
        </View>
        <View style={styles.details}>
          {contactItems.map(item => (
            <Touchable onPress={item.onPress} key={item.icon}>
              <View style={styles.detailItem}>
                <Text style={styles.detailItemLabel}>{item.icon}</Text>
                <Text style={styles.detailItemValue}>{item.value}</Text>
              </View>
            </Touchable>
          ))}
        </View>
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
    gap: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profile: {
    gap: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: 8,
  },
  name: {
    fontSize: 24,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  username: {
    fontSize: 16,
    color: colors.secondaryDark,
  },
  details: {
    gap: 16,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  detailItemLabel: {
    fontSize: 16,
    color: colors.textSecondary,
  },
  detailItemValue: {
    fontSize: 16,
    color: colors.textSecondary,
  },
});
