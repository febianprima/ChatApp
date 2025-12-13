/**
 * Date formatter utility for international format
 * Uses Intl.DateTimeFormat for locale-aware formatting
 */

type DateInput = string | number | Date;

/**
 * Format date to international format (DD/MM/YYYY)
 */
export const formatDate = (date: DateInput): string => {
  const d = new Date(date);
  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(d);
};

/**
 * Format date with time (DD/MM/YYYY HH:mm)
 */
export const formatDateTime = (date: DateInput): string => {
  const d = new Date(date);
  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(d);
};

/**
 * Format date with full month name (DD Month YYYY)
 */
export const formatDateLong = (date: DateInput): string => {
  const d = new Date(date);
  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(d);
};

/**
 * Format date with short month name (DD Mon YYYY)
 */
export const formatDateShort = (date: DateInput): string => {
  const d = new Date(date);
  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(d);
};

/**
 * Format time only (HH:mm)
 */
export const formatTime = (date: DateInput): string => {
  const d = new Date(date);
  return new Intl.DateTimeFormat('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(d);
};

/**
 * Format relative time (e.g., "2 hours ago", "Yesterday")
 */
export const formatRelativeTime = (date: DateInput): string => {
  const d = new Date(date);
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const diffSeconds = Math.floor(diffMs / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffSeconds < 60) {
    return 'Just now';
  }
  if (diffMinutes < 60) {
    return `${diffMinutes}m ago`;
  }
  if (diffHours < 24) {
    return `${diffHours}h ago`;
  }
  if (diffDays === 1) {
    return 'Yesterday';
  }
  if (diffDays < 7) {
    return `${diffDays}d ago`;
  }

  return formatDateShort(d);
};

/**
 * Format to ISO 8601 format (YYYY-MM-DD)
 */
export const formatISO = (date: DateInput): string => {
  const d = new Date(date);
  return d.toISOString().split('T')[0];
};
