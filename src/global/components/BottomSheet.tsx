import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Dimensions,
  Image,
  Modal,
  PanResponder,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { colors } from '../constants';

import { Touchable } from './Touchable';

interface BottomSheetProps {
  visible: boolean;
  onClose: () => void;
  options: global.BottomSheetOption[];
  title?: string;
  maxHeightRatio?: number; // 0-1, percentage of screen height
}

const SCREEN_HEIGHT = Dimensions.get('window').height;
const CLOSE_THRESHOLD = 100; // Pixels to drag before closing

export function BottomSheet({
  visible,
  onClose,
  options,
  title,
  maxHeightRatio = 0.8,
}: BottomSheetProps) {
  const maxHeight = SCREEN_HEIGHT * maxHeightRatio;
  const translateY = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
  const overlayOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      // Animate in
      Animated.parallel([
        Animated.spring(translateY, {
          toValue: 0,
          useNativeDriver: true,
          tension: 65,
          friction: 11,
        }),
        Animated.timing(overlayOpacity, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      // Reset position for next open
      translateY.setValue(SCREEN_HEIGHT);
      overlayOpacity.setValue(0);
    }
  }, [visible, translateY, overlayOpacity]);

  const animateClose = () => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: SCREEN_HEIGHT,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(overlayOpacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onClose();
    });
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, gestureState) => {
        // Only respond to downward gestures
        return gestureState.dy > 0;
      },
      onPanResponderMove: (_, gestureState) => {
        // Only allow dragging down
        if (gestureState.dy > 0) {
          translateY.setValue(gestureState.dy);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy > CLOSE_THRESHOLD || gestureState.vy > 0.5) {
          // Close if dragged far enough or fast enough
          animateClose();
        } else {
          // Snap back
          Animated.spring(translateY, {
            toValue: 0,
            useNativeDriver: true,
            tension: 65,
            friction: 11,
          }).start();
        }
      },
    }),
  ).current;

  return (
    <Modal visible={visible} transparent animationType="none" onRequestClose={animateClose}>
      <Animated.View style={[styles.overlay, { opacity: overlayOpacity }]}>
        <Pressable style={styles.overlayPressable} onPress={animateClose} />
        <Animated.View
          style={[styles.container, { transform: [{ translateY }], maxHeight }]}
          {...panResponder.panHandlers}>
          {/* Drag handle */}
          <View style={styles.handleContainer}>
            <View style={styles.handle} />
          </View>
          {title && <Text style={styles.title}>{title}</Text>}
          <ScrollView style={styles.optionsContainer} showsVerticalScrollIndicator={false}>
            {options.map((option, index) => (
              <Touchable
                key={index}
                style={styles.option}
                onPress={() => {
                  option.onPress();
                  animateClose();
                }}>
                {option.avatar && (
                  <Image source={{ uri: option.avatar }} style={styles.optionAvatar} />
                )}
                {option.icon && !option.avatar && (
                  <Text style={styles.optionIcon}>{option.icon}</Text>
                )}
                <View style={styles.optionContent}>
                  <Text
                    style={[styles.optionText, option.destructive && styles.optionTextDestructive]}>
                    {option.label}
                  </Text>
                  {option.subtitle && <Text style={styles.optionSubtitle}>{option.subtitle}</Text>}
                </View>
              </Touchable>
            ))}
          </ScrollView>
          <Touchable style={styles.cancelButton} onPress={animateClose}>
            <Text style={styles.cancelText}>Cancel</Text>
          </Touchable>
        </Animated.View>
      </Animated.View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: colors.overlay,
    justifyContent: 'flex-end',
  },
  overlayPressable: {
    flex: 1,
  },
  container: {
    marginHorizontal: 16,
    marginBottom: 32,
    borderRadius: 24,
    backgroundColor: colors.surface,
    overflow: 'hidden',
  },
  handleContainer: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.border,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 8,
  },
  optionsContainer: {
    flexGrow: 0,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  optionAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
    backgroundColor: colors.border,
  },
  optionIcon: {
    fontSize: 18,
    color: colors.primary,
    marginRight: 12,
  },
  optionContent: {
    flex: 1,
    gap: 2,
  },
  optionText: {
    fontSize: 16,
    color: colors.textPrimary,
  },
  optionSubtitle: {
    fontSize: 12,
    color: colors.textTertiary,
  },
  optionTextDestructive: {
    color: colors.error,
  },
  cancelButton: {
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingVertical: 16,
    alignItems: 'center',
  },
  cancelText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textSecondary,
  },
});
