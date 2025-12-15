/**
 * End-to-end test for the Settings Flow
 *
 * Tests the complete user journey of:
 * 1. Viewing settings and user profile
 * 2. Opening user picker
 * 3. Switching to a different user
 * 4. Verifying the switch was successful
 */
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fireEvent, render, waitFor } from '@testing-library/react-native';
import React from 'react';

import { useGlobalStore } from '../../src/global/store';
// Import after mocks
import { SettingsScreen } from '../../src/settings/screens/SettingsScreen';

// Mock DeviceInfo
jest.mock('react-native-device-info', () => ({
  getVersion: () => '1.0.0',
  getBuildNumber: () => '42',
}));

// Mock queries
jest.mock('../../src/chat/queries', () => ({
  useGetUser: jest.fn(() => ({
    data: {
      id: 1,
      name: 'Current User',
      username: 'currentuser',
      avatar: 'https://example.com/avatar1.jpg',
      email: 'current@example.com',
    },
    isLoading: false,
  })),
  useGetUsers: jest.fn(() => ({
    data: {
      results: [
        {
          id: 1,
          name: 'Current User',
          username: 'currentuser',
          avatar: 'https://example.com/avatar1.jpg',
        },
        {
          id: 2,
          name: 'John Doe',
          username: 'johndoe',
          avatar: 'https://example.com/avatar2.jpg',
        },
        {
          id: 3,
          name: 'Jane Smith',
          username: 'janesmith',
          avatar: 'https://example.com/avatar3.jpg',
        },
      ],
      total: 3,
    },
    isLoading: false,
  })),
}));

function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
  });

  return function Wrapper({ children }: { children: React.ReactNode }) {
    return React.createElement(QueryClientProvider, { client: queryClient }, children);
  };
}

describe('Settings Flow E2E', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    useGlobalStore.setState({ userId: 1, isAuthenticated: true });
  });

  describe('Settings Display', () => {
    it('should display current user information', async () => {
      const { getByText } = render(<SettingsScreen />, { wrapper: createWrapper() });

      await waitFor(() => {
        expect(getByText('Current User')).toBeTruthy();
        expect(getByText('@currentuser')).toBeTruthy();
      });
    });

    it('should display app version', async () => {
      const { getByText } = render(<SettingsScreen />, { wrapper: createWrapper() });

      await waitFor(() => {
        expect(getByText('Version 1.0.0 (42)')).toBeTruthy();
      });
    });

    it('should display Switch User button', async () => {
      const { getByText } = render(<SettingsScreen />, { wrapper: createWrapper() });

      await waitFor(() => {
        expect(getByText('Switch User')).toBeTruthy();
      });
    });
  });

  describe('User Picker', () => {
    it('should open user picker when Switch User is pressed', async () => {
      const { getByText } = render(<SettingsScreen />, { wrapper: createWrapper() });

      await waitFor(() => {
        expect(getByText('Switch User')).toBeTruthy();
      });

      fireEvent.press(getByText('Switch User'));

      await waitFor(() => {
        expect(getByText('Select User')).toBeTruthy();
      });
    });

    it('should display all users in picker', async () => {
      const { getByText, queryAllByText } = render(<SettingsScreen />, {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(getByText('Switch User')).toBeTruthy();
      });

      fireEvent.press(getByText('Switch User'));

      await waitFor(() => {
        // Current User appears twice (profile and picker)
        expect(queryAllByText('Current User').length).toBeGreaterThanOrEqual(1);
        expect(getByText('John Doe')).toBeTruthy();
        expect(getByText('Jane Smith')).toBeTruthy();
      });
    });

    it('should show "Current user" subtitle for active user', async () => {
      const { getByText } = render(<SettingsScreen />, { wrapper: createWrapper() });

      await waitFor(() => {
        expect(getByText('Switch User')).toBeTruthy();
      });

      fireEvent.press(getByText('Switch User'));

      await waitFor(() => {
        expect(getByText('Current user')).toBeTruthy();
      });
    });

    it('should show username for other users', async () => {
      const { getByText } = render(<SettingsScreen />, { wrapper: createWrapper() });

      await waitFor(() => {
        expect(getByText('Switch User')).toBeTruthy();
      });

      fireEvent.press(getByText('Switch User'));

      await waitFor(() => {
        expect(getByText('@johndoe')).toBeTruthy();
        expect(getByText('@janesmith')).toBeTruthy();
      });
    });
  });

  describe('User Switching', () => {
    it('should update userId when a different user is selected', async () => {
      const { getByText } = render(<SettingsScreen />, { wrapper: createWrapper() });

      await waitFor(() => {
        expect(getByText('Switch User')).toBeTruthy();
      });

      // Initial state
      expect(useGlobalStore.getState().userId).toBe(1);

      fireEvent.press(getByText('Switch User'));

      await waitFor(() => {
        expect(getByText('John Doe')).toBeTruthy();
      });

      fireEvent.press(getByText('John Doe'));

      // Verify userId was updated
      expect(useGlobalStore.getState().userId).toBe(2);
    });
  });

  describe('Complete Settings Flow', () => {
    it('should complete the full settings journey', async () => {
      // Step 1: Render settings
      const { getByText, queryByText } = render(<SettingsScreen />, { wrapper: createWrapper() });

      // Step 2: Verify current user is displayed
      await waitFor(() => {
        expect(getByText('Current User')).toBeTruthy();
        expect(getByText('@currentuser')).toBeTruthy();
      });

      // Step 3: Verify version is displayed
      expect(getByText('Version 1.0.0 (42)')).toBeTruthy();

      // Step 4: Open user picker
      fireEvent.press(getByText('Switch User'));

      // Step 5: Verify picker title
      await waitFor(() => {
        expect(getByText('Select User')).toBeTruthy();
      });

      // Step 6: Verify all users are shown
      expect(queryByText('John Doe')).toBeTruthy();
      expect(queryByText('Jane Smith')).toBeTruthy();

      // Step 7: Switch to different user
      fireEvent.press(getByText('John Doe'));

      // Step 8: Verify store was updated
      expect(useGlobalStore.getState().userId).toBe(2);
    });
  });
});
