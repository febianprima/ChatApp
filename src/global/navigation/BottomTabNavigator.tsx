import { BottomTabBarProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useCallback } from 'react';
import { StyleSheet, Text } from 'react-native';

import { ChatStackNavigator } from '../../chat/navigation/ChatStackNavigator';
import { SettingsStackNavigator } from '../../settings/navigation/SettingsStackNavigator';

import { AnimatedTabBar } from '../components';

const Tab = createBottomTabNavigator<global.BottomTabParamList>();

// Define stable icon components outside of render
function ChatTabIcon({ focused }: { focused: boolean }) {
  return <Text style={[styles.icon, focused && styles.iconFocused]}>💬</Text>;
}

function SettingsTabIcon({ focused }: { focused: boolean }) {
  return <Text style={[styles.icon, focused && styles.iconFocused]}>⚙️</Text>;
}

export function BottomTabNavigator() {
  const renderTabBar = useCallback((props: BottomTabBarProps) => <AnimatedTabBar {...props} />, []);

  return (
    <Tab.Navigator
      tabBar={renderTabBar}
      screenOptions={{
        headerShown: false,
      }}>
      <Tab.Screen
        name="ChatTab"
        component={ChatStackNavigator}
        options={{
          tabBarLabel: 'Chats',
          tabBarIcon: ChatTabIcon,
        }}
      />
      <Tab.Screen
        name="SettingsTab"
        component={SettingsStackNavigator}
        options={{ tabBarLabel: 'Settings', tabBarIcon: SettingsTabIcon }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  icon: {
    fontSize: 20,
  },
  iconFocused: {
    transform: [{ scale: 1.1 }],
  },
});
