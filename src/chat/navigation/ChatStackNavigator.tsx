import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { colors } from '../../global/constants';

import { ChatRoomHeader } from '../components';
import { ChatListScreen, ChatRoomScreen, ProfileScreen } from '../screens';

const Stack = createNativeStackNavigator<chat.ChatStackParamList>();

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
        headerTitleAlign: 'center',
      }}>
      <Stack.Screen name="ChatList" component={ChatListScreen} options={{ title: 'Chats' }} />
      <Stack.Screen
        name="ChatRoom"
        component={ChatRoomScreen}
        options={{ title: 'Chat', header: ChatRoomHeader }}
      />
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ title: 'Profile', headerShown: false }}
      />
    </Stack.Navigator>
  );
}
