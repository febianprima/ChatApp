/**
 * Date formatter utility
 * Single smart formatter for all date display needs
 * Supports dynamic timezone updates
 */

type DateInput = string | number | Date;

/**
 * Get current device timezone
 */
export const getDeviceTimezone = (): string => {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
};

/**
 * Format date contextually based on recency:
 * - Today: returns time only (HH:MM)
 * - Yesterday: returns "Yesterday, HH:MM"
 * - Older: returns "DD/MM/YYYY, HH:MM"
 *
 * @param date - Date to format
 * @param timezone - Optional timezone (defaults to device timezone)
 */
export const formatDate = (date: DateInput, timezone: string = getDeviceTimezone()): string => {
  const d = new Date(date);
  const now = new Date();

  // Get start of today (midnight) in device timezone
  const startOfToday = new Date(now);
  startOfToday.setHours(0, 0, 0, 0);

  // Get start of yesterday
  const startOfYesterday = new Date(startOfToday);
  startOfYesterday.setDate(startOfYesterday.getDate() - 1);

  const timeString = new Intl.DateTimeFormat('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: timezone,
  }).format(d);

  // If date is today
  if (d >= startOfToday) {
    return timeString;
  }

  // If date is yesterday
  if (d >= startOfYesterday && d < startOfToday) {
    return `Yesterday, ${timeString}`;
  }

  // Older than yesterday
  const dateString = new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    timeZone: timezone,
  }).format(d);

  return `${dateString}, ${timeString}`;
};
