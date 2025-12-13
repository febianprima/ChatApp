import React from 'react';
import { View } from 'react-native';

import { ChatListItemSkeleton } from './ChatListItemSkeleton';

export function ChatListSkeleton() {
  return (
    <View>
      {Array.from({ length: 10 }).map((_, index) => (
        <ChatListItemSkeleton key={index} />
      ))}
    </View>
  );
}
