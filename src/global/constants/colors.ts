export const colors = {
  // Primary
  primary: '#007AFF',
  primaryLight: '#4DA3FF',
  primaryDark: '#0055B3',

  // Secondary
  secondary: '#5856D6',
  secondaryLight: '#7A79E0',
  secondaryDark: '#3634A3',

  // Neutral
  white: '#FFFFFF',
  black: '#000000',
  background: '#F2F2F7',
  surface: '#FFFFFF',

  // Text
  textPrimary: '#1A1A1A',
  textSecondary: '#666666',
  textTertiary: '#8E8E93',
  textInverse: '#FFFFFF',

  // Border
  border: '#E5E5E5',
  borderLight: '#F0F0F0',
  divider: '#C6C6C8',

  // Status
  success: '#34C759',
  warning: '#FF9500',
  error: '#FF3B30',
  info: '#5AC8FA',

  // Overlay
  overlay: 'rgba(0, 0, 0, 0.5)',
  overlayLight: 'rgba(0, 0, 0, 0.3)',
  touchable: 'rgba(212,208,238,0.3)',
} as const;

export type ColorKey = keyof typeof colors;
