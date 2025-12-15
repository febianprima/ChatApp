import { renderHook } from '@testing-library/react-native';

import { useTimezone } from '../useTimezone';

describe('useTimezone', () => {
  it('should return a timezone string', () => {
    const { result } = renderHook(() => useTimezone());

    expect(typeof result.current).toBe('string');
    expect(result.current.length).toBeGreaterThan(0);
  });

  it('should return a valid IANA timezone', () => {
    const { result } = renderHook(() => useTimezone());

    // Valid timezones contain a slash (e.g., "America/New_York", "Asia/Tokyo")
    // or are "UTC"
    expect(result.current).toMatch(/^[A-Za-z_]+\/[A-Za-z_]+$|^UTC$/);
  });
});
