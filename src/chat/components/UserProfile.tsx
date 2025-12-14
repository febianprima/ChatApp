import React, { ReactNode, useMemo } from 'react';
import { Image, StyleSheet, Text, View, ViewStyle } from 'react-native';

import { colors } from '../../global/constants';

import { NewChatButton } from './NewChatButton';

type AvatarSize = 'small' | 'medium' | 'large';

interface UserProfileProps {
  avatar?: string;
  name: string;
  username?: string;
  lastSeenDate?: string | ReactNode;
  size?: AvatarSize;
  style?: ViewStyle;
}

const AVATAR_SIZES: Record<AvatarSize, number> = {
  small: 32,
  medium: 40,
  large: 56,
};

export function UserProfile({
  avatar,
  name,
  username,
  lastSeenDate,
  size = 'medium',
  style,
}: UserProfileProps) {
  const avatarSize = AVATAR_SIZES[size];

  const renderRightComponent = useMemo(() => {
    if (lastSeenDate) {
      return <Text style={styles.lastSeenDate}>{lastSeenDate}</Text>;
    }

    if (typeof lastSeenDate === 'string') {
      return <NewChatButton />;
    }

    return null;
  }, [lastSeenDate]);

  return (
    <View style={[styles.container, style]}>
      <View style={styles.profile}>
        <Image
          source={{ uri: avatar }}
          style={[
            styles.avatar,
            { width: avatarSize, height: avatarSize, borderRadius: avatarSize / 2 },
          ]}
        />
        <View style={styles.info}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.username}>{`@${username}`}</Text>
        </View>
      </View>
      {renderRightComponent}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  profile: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    backgroundColor: colors.border,
  },
  info: {
    gap: 2,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  username: {
    fontSize: 12,
    color: colors.secondaryDark,
  },
  lastSeenDate: {
    fontSize: 12,
    color: colors.textTertiary,
    paddingVertical: 4,
  },
});
