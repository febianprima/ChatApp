import React, { memo, useState } from 'react';
import { Platform, StyleSheet, Text, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Touchable } from '../../global/components';
import { colors } from '../../global/constants';
import { useGlobalStore } from '../../global/store';

import { usePostChatMessage } from '../queries';

function ChatInputComponent() {
  const [message, setMessage] = useState('');
  const { bottom } = useSafeAreaInsets();

  const { mutate: onSend, isPending } = usePostChatMessage();
  const { userId } = useGlobalStore();

  const handleSend = () => {
    const trimmedMessage = message.trim();
    if (trimmedMessage) {
      onSend({
        userId,
        body: trimmedMessage,
      });
      setMessage('');
    }
  };

  const canSend = message.trim().length > 0 && !isPending;

  return (
    <View style={[styles.container, { paddingBottom: Math.max(bottom, 16) }]}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={message}
          onChangeText={setMessage}
          placeholder="Type a message..."
          placeholderTextColor={colors.textTertiary}
          multiline
          maxLength={500}
        />
        <Touchable
          onPress={handleSend}
          disabled={!canSend}
          style={canSend ? styles.sendButton : styles.sendButtonDisabled}
          type="circle">
          <Text style={styles.sendIcon}>💬</Text>
        </Touchable>
      </View>
    </View>
  );
}

export const ChatInput = memo(ChatInputComponent);

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: 12,
    paddingHorizontal: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 8,
  },
  input: {
    flex: 1,
    backgroundColor: colors.background,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'ios' ? 12 : 8,
    paddingBottom: Platform.OS === 'ios' ? 12 : 8,
    fontSize: 16,
    color: colors.textPrimary,
    maxHeight: 120,
    minHeight: 40,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendButtonDisabled: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendIcon: {
    fontSize: 20,
    color: colors.white,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});
