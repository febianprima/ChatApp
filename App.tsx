import { NavigationContainer } from '@react-navigation/native';
import { QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { Platform, StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { Snackbar } from './src/global/components';
import { queryClient } from './src/global/config/queryClient';
import { colors } from './src/global/constants';
import { BottomTabNavigator } from './src/global/navigation/BottomTabNavigator';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <StatusBar
          barStyle="dark-content"
          backgroundColor={colors.primary}
          translucent={Platform.OS === 'android'}
        />
        <NavigationContainer>
          <BottomTabNavigator />
        </NavigationContainer>
        <Snackbar />
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}

export default App;
