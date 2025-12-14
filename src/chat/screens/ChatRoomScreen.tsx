import React, { useCallback, useRef } from 'react';
import {
  ActivityIndicator,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  View,
} from 'react-native';

import { colors } from '../../global/constants';

import { ChatBubble } from '../components/ChatBubble';
import { ChatInput } from '../components/ChatInput';
import { DateSeparator } from '../components/DateSeparator';
import { ChatListItem, useChatRoomMessages } from '../hooks/useChatRoomMessages';

export function ChatRoomScreen() {
  const flatListRef = useRef<FlatList>(null);
  const { items, isLoading } = useChatRoomMessages();

  const renderItem = useCallback(({ item }: { item: ChatListItem }) => {
    if (item.type === 'separator') {
      return <DateSeparator label={item.label} />;
    }
    return <ChatBubble post={item} isOwn={item.isOwn} />;
  }, []);

  const keyExtractor = useCallback((item: ChatListItem) => {
    if (item.type === 'separator') {
      return item.id;
    }
    return `message-${item.id}`;
  }, []);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <FlatList
        ref={flatListRef}
        data={items}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        inverted
        keyboardDismissMode="interactive"
      />
      <ChatInput />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.surface,
  },
  listContent: {
    paddingVertical: 16,
    gap: 16,
  },
});
