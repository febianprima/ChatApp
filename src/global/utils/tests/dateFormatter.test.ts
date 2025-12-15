import { formatDate, getDeviceTimezone } from '../dateFormatter';

describe('dateFormatter', () => {
  describe('getDeviceTimezone', () => {
    it('returns a valid timezone string', () => {
      const timezone = getDeviceTimezone();
      expect(typeof timezone).toBe('string');
      expect(timezone.length).toBeGreaterThan(0);
    });
  });

  describe('formatDate', () => {
    const timezone = 'UTC';

    it('formats today date as time only', () => {
      const now = new Date();
      const result = formatDate(now, timezone);

      // Should be in HH:MM format
      expect(result).toMatch(/^\d{2}:\d{2}$/);
    });

    it('formats yesterday date with "Yesterday" prefix', () => {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      yesterday.setHours(12, 30, 0, 0);

      const result = formatDate(yesterday, timezone);

      expect(result).toContain('Yesterday');
      expect(result).toMatch(/Yesterday, \d{2}:\d{2}/);
    });

    it('formats older dates with full date and time', () => {
      const oldDate = new Date('2023-01-15T10:30:00Z');
      const result = formatDate(oldDate, timezone);

      // Should be in DD/MM/YYYY, HH:MM format
      expect(result).toBe('15/01/2023, 10:30');
    });

    it('accepts Date object', () => {
      const date = new Date('2023-06-20T15:45:00Z');
      const result = formatDate(date, timezone);

      expect(result).toBe('20/06/2023, 15:45');
    });

    it('accepts ISO string', () => {
      const isoString = '2023-06-20T15:45:00Z';
      const result = formatDate(isoString, timezone);

      expect(result).toBe('20/06/2023, 15:45');
    });

    it('accepts timestamp number', () => {
      const timestamp = new Date('2023-06-20T15:45:00Z').getTime();
      const result = formatDate(timestamp, timezone);

      expect(result).toBe('20/06/2023, 15:45');
    });
  });
});
