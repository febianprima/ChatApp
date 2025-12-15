import { renderHook } from '@testing-library/react-native';

import { useFormatDate } from '../useFormatDate';

describe('useFormatDate', () => {
  it('should return a function', () => {
    const { result } = renderHook(() => useFormatDate());

    expect(typeof result.current).toBe('function');
  });

  it('should format a valid date', () => {
    const { result } = renderHook(() => useFormatDate());

    const formatted = result.current('2024-01-15T10:30:00Z');

    expect(typeof formatted).toBe('string');
    expect(formatted.length).toBeGreaterThan(0);
  });

  it('should handle undefined input', () => {
    const { result } = renderHook(() => useFormatDate());

    const formatted = result.current(undefined);

    expect(typeof formatted).toBe('string');
  });

  it('should handle null input', () => {
    const { result } = renderHook(() => useFormatDate());

    const formatted = result.current(null as unknown as string);

    expect(typeof formatted).toBe('string');
  });
});
