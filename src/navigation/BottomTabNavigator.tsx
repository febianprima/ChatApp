import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { StyleSheet, Text } from 'react-native';

import { ChatStackNavigator } from '../chat/navigation/ChatStackNavigator';
import { colors } from '../global/constants';
import { SettingsScreen } from '../settings/screens';

export type BottomTabParamList = {
  ChatTab: undefined;
  SettingsTab: undefined;
};

const Tab = createBottomTabNavigator<BottomTabParamList>();

// Define stable icon components outside of render
function ChatTabIcon({ focused }: { focused: boolean }) {
  return <Text style={[styles.icon, focused && styles.iconFocused]}>💬</Text>;
}

function SettingsTabIcon({ focused }: { focused: boolean }) {
  return <Text style={[styles.icon, focused && styles.iconFocused]}>⚙️</Text>;
}

export function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textTertiary,
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabBarLabel,
        headerShown: false,
      }}>
      <Tab.Screen
        name="ChatTab"
        component={ChatStackNavigator}
        options={{ tabBarLabel: 'Chats', tabBarIcon: ChatTabIcon }}
      />
      <Tab.Screen
        name="SettingsTab"
        component={SettingsScreen}
        options={{ tabBarLabel: 'Settings', tabBarIcon: SettingsTabIcon }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    backgroundColor: colors.background,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 20,
    paddingTop: 8,
    paddingBottom: 8,
    marginBottom: 24,
    marginHorizontal: 24,
    height: 72,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabBarLabel: {
    fontSize: 12,
    fontWeight: '500',
    marginTop: 4,
  },
  icon: {
    fontSize: 24,
  },
  iconFocused: {
    transform: [{ scale: 1.1 }],
  },
  header: {
    backgroundColor: colors.surface,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textPrimary,
  },
});
