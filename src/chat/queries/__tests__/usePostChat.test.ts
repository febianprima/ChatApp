import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook } from '@testing-library/react-native';
import React from 'react';

import { useChatStore } from '../../store';

import { usePostChatMessage } from '../usePostChat';

// Create a wrapper with QueryClientProvider
function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
      mutations: {
        retry: false,
      },
    },
  });

  return function Wrapper({ children }: { children: React.ReactNode }) {
    return React.createElement(QueryClientProvider, { client: queryClient }, children);
  };
}

// Mock fetch
const mockFetch = jest.fn();
(globalThis as { fetch: typeof fetch }).fetch = mockFetch;

describe('usePostChatMessage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    useChatStore.setState({
      selectedContactUser: null,
      blockedUsers: [],
      sentMessagesByUser: {},
    });
  });

  it('should return mutate function', () => {
    const { result } = renderHook(() => usePostChatMessage(), {
      wrapper: createWrapper(),
    });

    expect(typeof result.current.mutate).toBe('function');
  });

  it('should return isPending state', () => {
    const { result } = renderHook(() => usePostChatMessage(), {
      wrapper: createWrapper(),
    });

    expect(typeof result.current.isPending).toBe('boolean');
    expect(result.current.isPending).toBe(false);
  });

  it('should have mutate function that can be called', () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () =>
        Promise.resolve({
          id: 999,
          userId: 1,
          title: 'New Message',
          body: 'Hello!',
          tags: [],
          category: 'chat',
          createdAt: new Date().toISOString(),
        }),
    });

    const { result } = renderHook(() => usePostChatMessage(), {
      wrapper: createWrapper(),
    });

    // Should not throw when called
    expect(() => {
      result.current.mutate({ userId: 1, body: 'Hello!' });
    }).not.toThrow();
  });
});
