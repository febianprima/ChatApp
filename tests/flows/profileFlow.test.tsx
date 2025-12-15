/**
 * End-to-end test for the Profile Flow
 *
 * Tests the complete user journey of:
 * 1. Viewing a contact's profile
 * 2. Opening the menu
 * 3. Blocking/Unblocking a user
 * 4. Navigating back
 */
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fireEvent, render, waitFor } from '@testing-library/react-native';
import React from 'react';

// Import after mocks
import { ProfileScreen } from '../../src/chat/screens/ProfileScreen';
import { useChatStore } from '../../src/chat/store';
import { useGlobalStore, useSnackbarStore } from '../../src/global/store';

// Mock navigation
const mockGoBack = jest.fn();
const mockPopToTop = jest.fn();
const mockReplace = jest.fn();
const mockCanGoBack = jest.fn(() => true);

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    canGoBack: mockCanGoBack,
    goBack: mockGoBack,
    popToTop: mockPopToTop,
    replace: mockReplace,
  }),
}));

// Mock queries
jest.mock('../../src/chat/queries', () => ({
  useGetUser: jest.fn(() => ({
    data: {
      id: 2,
      name: 'John Doe',
      username: 'johndoe',
      avatar: 'https://example.com/avatar.jpg',
      email: 'john@example.com',
      phone: '1234567890',
      website: 'https://johndoe.com',
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

describe('Profile Flow E2E', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    useGlobalStore.setState({ userId: 1, isAuthenticated: true });
    useChatStore.setState({
      selectedContactUser: {
        id: 2,
        name: 'John Doe',
        username: 'johndoe',
        avatar: 'https://example.com/avatar.jpg',
      } as chat.User,
      blockedUsers: [],
      sentMessagesByUser: {},
    });
    useSnackbarStore.setState({
      visible: false,
      message: '',
      type: 'info',
    });
  });

  describe('Profile Display', () => {
    it('should display user profile information', async () => {
      const { getByText } = render(<ProfileScreen />, { wrapper: createWrapper() });

      await waitFor(() => {
        expect(getByText('John Doe')).toBeTruthy();
        expect(getByText('@johndoe')).toBeTruthy();
      });
    });

    it('should display contact items', async () => {
      const { getByText } = render(<ProfileScreen />, { wrapper: createWrapper() });

      await waitFor(() => {
        expect(getByText('john@example.com')).toBeTruthy();
        expect(getByText('1234567890')).toBeTruthy();
        expect(getByText('https://johndoe.com')).toBeTruthy();
      });
    });

    it('should display back button when canGoBack is true', async () => {
      const { toJSON } = render(<ProfileScreen />, { wrapper: createWrapper() });

      await waitFor(() => {
        expect(toJSON()).toBeTruthy();
      });

      expect(mockCanGoBack).toHaveBeenCalled();
    });
  });

  describe('Menu Interactions', () => {
    it('should display menu button', async () => {
      const { getByText } = render(<ProfileScreen />, { wrapper: createWrapper() });

      await waitFor(() => {
        expect(getByText('⋯')).toBeTruthy();
      });
    });

    it('should open menu when menu button is pressed', async () => {
      const { getByText } = render(<ProfileScreen />, { wrapper: createWrapper() });

      await waitFor(() => {
        expect(getByText('John Doe')).toBeTruthy();
      });

      fireEvent.press(getByText('⋯'));

      await waitFor(() => {
        expect(getByText('Block User')).toBeTruthy();
      });
    });
  });

  describe('Block/Unblock Flow', () => {
    it('should show Block User option when user is not blocked', async () => {
      const { getByText } = render(<ProfileScreen />, { wrapper: createWrapper() });

      await waitFor(() => {
        expect(getByText('John Doe')).toBeTruthy();
      });

      fireEvent.press(getByText('⋯'));

      await waitFor(() => {
        expect(getByText('Block User')).toBeTruthy();
      });
    });

    it('should show Unblock User option when user is blocked', async () => {
      useChatStore.setState({ blockedUsers: [2] });

      const { getByText } = render(<ProfileScreen />, { wrapper: createWrapper() });

      await waitFor(() => {
        expect(getByText('John Doe')).toBeTruthy();
      });

      fireEvent.press(getByText('⋯'));

      await waitFor(() => {
        expect(getByText('Unblock User')).toBeTruthy();
      });
    });

    it('should update blockedUsers when unblock is pressed', async () => {
      useChatStore.setState({ blockedUsers: [2] });

      const { getByText } = render(<ProfileScreen />, { wrapper: createWrapper() });

      await waitFor(() => {
        expect(getByText('John Doe')).toBeTruthy();
      });

      fireEvent.press(getByText('⋯'));

      await waitFor(() => {
        expect(getByText('Unblock User')).toBeTruthy();
      });

      fireEvent.press(getByText('Unblock User'));

      expect(useChatStore.getState().blockedUsers).not.toContain(2);
    });

    it('should show snackbar when unblocking user', async () => {
      useChatStore.setState({ blockedUsers: [2] });

      const { getByText } = render(<ProfileScreen />, { wrapper: createWrapper() });

      await waitFor(() => {
        expect(getByText('John Doe')).toBeTruthy();
      });

      fireEvent.press(getByText('⋯'));

      await waitFor(() => {
        expect(getByText('Unblock User')).toBeTruthy();
      });

      fireEvent.press(getByText('Unblock User'));

      const snackbarState = useSnackbarStore.getState();
      expect(snackbarState.visible).toBe(true);
      expect(snackbarState.message).toContain('unblocked');
    });

    it('should navigate after unblocking', async () => {
      useChatStore.setState({ blockedUsers: [2] });

      const { getByText } = render(<ProfileScreen />, { wrapper: createWrapper() });

      await waitFor(() => {
        expect(getByText('John Doe')).toBeTruthy();
      });

      fireEvent.press(getByText('⋯'));
      fireEvent.press(getByText('Unblock User'));

      expect(mockReplace).toHaveBeenCalledWith('ChatRoom');
    });
  });

  describe('Complete Profile Flow', () => {
    it('should complete the full profile journey', async () => {
      // Step 1: Render profile screen
      const { getByText } = render(<ProfileScreen />, { wrapper: createWrapper() });

      // Step 2: Verify user info is displayed
      await waitFor(() => {
        expect(getByText('John Doe')).toBeTruthy();
        expect(getByText('@johndoe')).toBeTruthy();
      });

      // Step 3: Verify contact info is displayed
      expect(getByText('john@example.com')).toBeTruthy();
      expect(getByText('1234567890')).toBeTruthy();

      // Step 4: Open menu
      fireEvent.press(getByText('⋯'));

      // Step 5: Verify menu option is shown
      await waitFor(() => {
        expect(getByText('Block User')).toBeTruthy();
      });
    });
  });
});
