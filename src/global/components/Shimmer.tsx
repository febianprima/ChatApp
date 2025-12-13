import React, { useEffect, useRef } from 'react';
import { Animated, DimensionValue, StyleSheet, ViewStyle } from 'react-native';

import { colors } from '../constants';

type ShimmerShape = 'rectangle' | 'circle' | 'rounded';

interface ShimmerProps {
  width: DimensionValue;
  height: DimensionValue;
  shape?: ShimmerShape;
  borderRadius?: number;
  style?: ViewStyle;
}

export function Shimmer({ width, height, shape = 'rectangle', borderRadius, style }: ShimmerProps) {
  const opacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.3,
          duration: 800,
          useNativeDriver: true,
        }),
      ]),
    );
    animation.start();
    return () => animation.stop();
  }, [opacity]);

  const getShapeStyle = (): ViewStyle => {
    switch (shape) {
      case 'circle':
        return {
          borderRadius: typeof width === 'number' ? width / 2 : 50,
        };
      case 'rounded':
        return {
          borderRadius: borderRadius ?? 8,
        };
      case 'rectangle':
      default:
        return {
          borderRadius: borderRadius ?? 4,
        };
    }
  };

  return (
    <Animated.View
      style={[
        styles.shimmer,
        {
          width,
          height,
          opacity,
        },
        getShapeStyle(),
        style,
      ]}
    />
  );
}

const styles = StyleSheet.create({
  shimmer: {
    backgroundColor: colors.border,
  },
});
