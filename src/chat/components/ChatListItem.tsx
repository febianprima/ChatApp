import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

import { colors } from '../../global/constants';

const ChatListItem = ({ data }: { data: chat.User }) => {
  const { name, email, avatar } = data;
  return (
    <Pressable style={styles.container}>
      <Image source={{ uri: avatar }} style={styles.avatar} />
      <View style={styles.info}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.email}>{email}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    backgroundColor: colors.surface,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  info: {
    marginLeft: 16,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  email: {
    fontSize: 14,
    color: colors.textSecondary,
  },
});

export default ChatListItem;
