import { useCallback } from 'react';

import { formatDate } from '../utils/dateFormatter';

import { useTimezone } from './useTimezone';

type DateInput = string | number | Date;

/**
 * Hook that provides a timezone-aware date formatter.
 * Automatically re-renders when device timezone changes.
 */
export function useFormatDate() {
  const timezone = useTimezone();

  const format = useCallback(
    (date: DateInput | undefined): string => {
      if (!date) return '';

      return formatDate(date, timezone);
    },
    [timezone],
  );

  return format;
}
