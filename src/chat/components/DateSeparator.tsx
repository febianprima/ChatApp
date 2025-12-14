import React, { memo } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { colors } from '../../global/constants';

interface DateSeparatorProps {
  label: string;
}

export const DateSeparator = memo(({ label }: DateSeparatorProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 20,
    backgroundColor: colors.background,
    shadowColor: colors.secondaryDark,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  label: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.textTertiary,
  },
});
