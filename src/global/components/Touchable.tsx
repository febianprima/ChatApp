import React from 'react';
import {
  Platform,
  StyleSheet,
  TouchableHighlight,
  TouchableNativeFeedback,
  View,
  ViewStyle,
} from 'react-native';

import { colors } from '../constants';

interface TouchableProps {
  children: React.ReactNode;
  onPress?: () => void;
  onLongPress?: () => void;
  disabled?: boolean;
  style?: ViewStyle;
  rippleColor?: string;
  underlayColor?: string;
}

export function Touchable({
  children,
  onPress,
  onLongPress,
  disabled = false,
  style,
  rippleColor = colors.touchable,
  underlayColor = colors.touchable,
}: TouchableProps) {
  if (Platform.OS === 'android') {
    return (
      <TouchableNativeFeedback
        onPress={onPress}
        onLongPress={onLongPress}
        disabled={disabled}
        useForeground={true}
        background={TouchableNativeFeedback.Ripple(rippleColor, false)}>
        <View style={[styles.container, style]}>{children}</View>
      </TouchableNativeFeedback>
    );
  }

  return (
    <TouchableHighlight
      onPress={onPress}
      onLongPress={onLongPress}
      disabled={disabled}
      underlayColor={underlayColor}
      style={[styles.container, style]}>
       <View>{children}</View>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
});

