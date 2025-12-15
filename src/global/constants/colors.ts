export const colors = {
  // Brand
  primary: '#007AFF',
  accent: '#3634A3', // Used for chat bubbles, username highlights

  // Backgrounds
  background: '#F2F2F7',
  surface: '#FFFFFF',

  // Text
  textPrimary: '#1A1A1A',
  textSecondary: '#666666',
  textTertiary: '#8E8E93',
  textOnAccent: '#FFFFFF',

  // Borders & Dividers
  border: '#E5E5E5',

  // Status
  error: '#FF3B30',

  // Interaction
  overlay: 'rgba(0, 0, 0, 0.5)',
  ripple: 'rgba(212, 208, 238, 0.3)',
} as const;

export type ColorKey = keyof typeof colors;
