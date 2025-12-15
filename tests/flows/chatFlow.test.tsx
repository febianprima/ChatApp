/**
 * End-to-end test for the Chat Flow
 *
 * Tests the complete user journey of:
 * 1. Viewing the chat list
 * 2. Selecting a contact to chat with
 * 3. Viewing chat messages
 * 4. Sending a new message
 */
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fireEvent, render, waitFor } from '@testing-library/react-native';
import React from 'react';

// Import components after mocks
import { ChatListScreen } from '../../src/chat/screens/ChatListScreen';
import { ChatRoomScreen } from '../../src/chat/screens/ChatRoomScreen';
import { useChatStore } from '../../src/chat/store';
import { useGlobalStore } from '../../src/global/store';

// Mock navigation
const mockNavigate = jest.fn();
const mockGoBack = jest.fn();

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: mockNavigate,
    goBack: mockGoBack,
    canGoBack: () => true,
  }),
}));

// Mock queries
jest.mock('../../src/chat/queries', () => ({
  useGetUsers: jest.fn(() => ({
    data: {
      results: [
        {
          id: 2,
          name: 'John Doe',
          username: 'johndoe',
          avatar: 'https://example.com/avatar2.jpg',
          email: 'john@example.com',
          phone: '1234567890',
        },
        {
          id: 3,
          name: 'Jane Smith',
          username: 'janesmith',
          avatar: 'https://example.com/avatar3.jpg',
          email: 'jane@example.com',
          phone: '0987654321',
        },
      ],
      total: 2,
    },
    isLoading: false,
    fetchNextPage: jest.fn(),
    hasNextPage: false,
    isFetchingNextPage: false,
  })),
  useGetUserPosts: jest.fn(({ userId }: { userId: number }) => {
    // Return different data based on userId to avoid duplicate keys
    if (userId === 2) {
      return {
        data: {
          results: [
            {
              id: 201,
              userId: 2,
              title: 'Hello',
              body: 'Hi there!',
              tags: [],
              category: 'chat',
              createdAt: new Date().toISOString(),
            },
          ],
          total: 1,
        },
        lastPost: {
          id: 201,
          userId: 2,
          title: 'Hello',
          body: 'Hi there!',
          tags: [],
          category: 'chat',
          createdAt: new Date().toISOString(),
        },
        isLoading: false,
      };
    }
    // For authenticated user (userId 1)
    return {
      data: { results: [], total: 0 },
      lastPost: undefined,
      isLoading: false,
    };
  }),
  useGetUser: jest.fn(() => ({
    data: {
      id: 2,
      name: 'John Doe',
      username: 'johndoe',
      avatar: 'https://example.com/avatar2.jpg',
    },
    isLoading: false,
  })),
  usePostChatMessage: jest.fn(() => ({
    mutate: jest.fn(),
    isPending: false,
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

describe('Chat Flow E2E', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    useGlobalStore.setState({ userId: 1, isAuthenticated: true });
    useChatStore.setState({
      selectedContactUser: null,
      blockedUsers: [],
      sentMessagesByUser: {},
    });
  });

  describe('Chat List Screen', () => {
    it('should display list of contacts', async () => {
      const { getByText } = render(<ChatListScreen />, { wrapper: createWrapper() });

      await waitFor(() => {
        expect(getByText('John Doe')).toBeTruthy();
        expect(getByText('Jane Smith')).toBeTruthy();
      });
    });

    it('should display contact usernames', async () => {
      const { getByText } = render(<ChatListScreen />, { wrapper: createWrapper() });

      await waitFor(() => {
        expect(getByText('@johndoe')).toBeTruthy();
        expect(getByText('@janesmith')).toBeTruthy();
      });
    });

    it('should navigate to chat room when contact is pressed', async () => {
      const { getByText } = render(<ChatListScreen />, { wrapper: createWrapper() });

      await waitFor(() => {
        expect(getByText('John Doe')).toBeTruthy();
      });

      fireEvent.press(getByText('John Doe'));

      expect(mockNavigate).toHaveBeenCalledWith('ChatRoom');
    });

    it('should set selected contact in store when contact is pressed', async () => {
      const { getByText } = render(<ChatListScreen />, { wrapper: createWrapper() });

      await waitFor(() => {
        expect(getByText('John Doe')).toBeTruthy();
      });

      fireEvent.press(getByText('John Doe'));

      const state = useChatStore.getState();
      expect(state.selectedContactUser).toBeDefined();
      expect(state.selectedContactUser?.name).toBe('John Doe');
    });
  });

  describe('Chat Room Screen', () => {
    beforeEach(() => {
      useChatStore.setState({
        selectedContactUser: {
          id: 2,
          name: 'John Doe',
          username: 'johndoe',
          avatar: 'https://example.com/avatar2.jpg',
        } as chat.User,
      });
    });

    it('should display chat messages', async () => {
      const { getByText } = render(<ChatRoomScreen />, { wrapper: createWrapper() });

      await waitFor(() => {
        expect(getByText('Hi there!')).toBeTruthy();
      });
    });

    it('should display date separators', async () => {
      const { getByText } = render(<ChatRoomScreen />, { wrapper: createWrapper() });

      await waitFor(() => {
        expect(getByText('Today')).toBeTruthy();
      });
    });

    it('should display message input', async () => {
      const { getByPlaceholderText } = render(<ChatRoomScreen />, { wrapper: createWrapper() });

      await waitFor(() => {
        expect(getByPlaceholderText('Type a message...')).toBeTruthy();
      });
    });

    it('should allow typing a message', async () => {
      const { getByPlaceholderText } = render(<ChatRoomScreen />, { wrapper: createWrapper() });

      await waitFor(() => {
        const input = getByPlaceholderText('Type a message...');
        fireEvent.changeText(input, 'Hello, World!');
        expect(input.props.value).toBe('Hello, World!');
      });
    });
  });

  describe('Complete Chat Flow', () => {
    it('should complete the full chat journey', async () => {
      // Step 1: Render chat list
      const { getByText, unmount } = render(<ChatListScreen />, { wrapper: createWrapper() });

      // Step 2: Verify contacts are displayed
      await waitFor(() => {
        expect(getByText('John Doe')).toBeTruthy();
      });

      // Step 3: Select a contact
      fireEvent.press(getByText('John Doe'));

      // Step 4: Verify navigation was triggered
      expect(mockNavigate).toHaveBeenCalledWith('ChatRoom');

      // Step 5: Verify store was updated
      expect(useChatStore.getState().selectedContactUser?.name).toBe('John Doe');

      unmount();

      // Step 6: Render chat room (simulating navigation)
      const chatRoom = render(<ChatRoomScreen />, { wrapper: createWrapper() });

      // Step 7: Verify messages are displayed
      await waitFor(() => {
        expect(chatRoom.getByText('Hi there!')).toBeTruthy();
      });

      // Step 8: Verify input is available
      expect(chatRoom.getByPlaceholderText('Type a message...')).toBeTruthy();
    });
  });
});
