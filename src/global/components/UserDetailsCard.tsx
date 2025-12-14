import React from 'react';
import { Image, StyleSheet, Text, View, ViewStyle } from 'react-native';

import { colors } from '../constants';

import { Touchable } from './Touchable';

interface ContactItem {
  icon: string;
  value: string;
  onPress: () => void;
}

interface UserDetailsCardProps {
  avatar?: string;
  name: string;
  username: string;
  contactItems?: ContactItem[];
  style?: ViewStyle;
}

export function UserDetailsCard({
  avatar,
  name,
  username,
  contactItems,
  style,
}: UserDetailsCardProps) {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.profile}>
        <Image source={{ uri: avatar }} style={styles.avatar} />
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.username}>{`@${username}`}</Text>
      </View>
      {contactItems && contactItems.length > 0 && (
        <View style={styles.details}>
          {contactItems.map(item => (
            <Touchable onPress={item.onPress} key={item.icon}>
              <View style={styles.detailItem}>
                <Text style={styles.detailItemIcon}>{item.icon}</Text>
                <Text style={styles.detailItemValue}>{item.value}</Text>
              </View>
            </Touchable>
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
    gap: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.border,
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
  detailItemIcon: {
    fontSize: 16,
    color: colors.textSecondary,
  },
  detailItemValue: {
    fontSize: 16,
    color: colors.textSecondary,
  },
});
