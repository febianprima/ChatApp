import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { colors } from '../../global/constants';

import { ChatListScreen, ChatScreen, ProfileScreen } from '../screens';

export type ChatStackParamList = {
  ChatList: undefined;
  Chat: { chatId?: string };
  Profile: { userId?: string };
};

const Stack = createNativeStackNavigator<ChatStackParamList>();

export function ChatStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.background,
        },
        headerTitleStyle: {
          fontSize: 18,
          fontWeight: '600',
          color: colors.textPrimary,
        },
        headerShadowVisible: true,
      }}>
      <Stack.Screen name="ChatList" component={ChatListScreen} options={{ title: 'Chats' }} />
      <Stack.Screen name="Chat" component={ChatScreen} options={{ title: 'Chat' }} />
      <Stack.Screen name="Profile" component={ProfileScreen} options={{ title: 'Profile' }} />
    </Stack.Navigator>
  );
}
