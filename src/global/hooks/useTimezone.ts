import { useEffect, useState } from 'react';
import { AppState, AppStateStatus } from 'react-native';

/**
 * Hook to track device timezone changes.
 * Re-renders components when timezone changes (e.g., user travels or changes device settings).
 */
export function useTimezone() {
  const [timezone, setTimezone] = useState(() => Intl.DateTimeFormat().resolvedOptions().timeZone);

  useEffect(() => {
    const checkTimezone = () => {
      const currentTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      if (currentTimezone !== timezone) {
        setTimezone(currentTimezone);
      }
    };

    const handleAppStateChange = (nextAppState: AppStateStatus) => {
      // Check timezone when app comes to foreground
      if (nextAppState === 'active') {
        checkTimezone();
      }
    };

    const subscription = AppState.addEventListener('change', handleAppStateChange);

    return () => {
      subscription.remove();
    };
  }, [timezone]);

  return timezone;
}
