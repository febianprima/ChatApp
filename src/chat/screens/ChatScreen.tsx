import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { colors } from '../../global/constants';

export function ChatScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chat</Text>
      <Text style={styles.subtitle}>Conversation details</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.surface,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
  },
});
