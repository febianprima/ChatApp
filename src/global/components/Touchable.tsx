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
  type?: 'default' | 'circle' | 'rounded';
}

export function Touchable({
  children,
  onPress,
  onLongPress,
  disabled = false,
  style,
  rippleColor = colors.ripple,
  underlayColor = colors.ripple,
  type = 'default',
}: TouchableProps) {
  if (Platform.OS === 'android') {
    return (
      <TouchableNativeFeedback
        onPress={onPress}
        onLongPress={onLongPress}
        disabled={disabled}
        useForeground={true}
        background={TouchableNativeFeedback.Ripple(rippleColor, false)}>
        <View
          style={[
            styles.container,
            type === 'circle' && styles.circle,
            type === 'rounded' && styles.rounded,
            style,
          ]}>
          {children}
        </View>
      </TouchableNativeFeedback>
    );
  }

  return (
    <TouchableHighlight
      onPress={onPress}
      onLongPress={onLongPress}
      disabled={disabled}
      underlayColor={underlayColor}
      style={[
        styles.container,
        type === 'circle' && styles.circle,
        type === 'rounded' && styles.rounded,
      ]}>
      <View style={style}>{children}</View>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
  circle: {
    borderRadius: 24,
  },
  rounded: {
    borderRadius: 12,
  },
});
