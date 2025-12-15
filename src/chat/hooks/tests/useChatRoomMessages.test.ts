import { renderHook } from '@testing-library/react-native';

import { useGlobalStore } from '../../../global/store';
import { useChatStore } from '../../store';

import { useChatRoomMessages } from '../useChatRoomMessages';

// Mock the queries
jest.mock('../../queries', () => ({
  useGetUserPosts: jest.fn(() => ({
    data: { results: [] },
    isLoading: false,
  })),
}));

describe('useChatRoomMessages', () => {
  beforeEach(() => {
    // Reset stores
    useGlobalStore.setState({ userId: 1, isAuthenticated: true });
    useChatStore.setState({
      selectedContactUser: { id: 2, name: 'John Doe', username: 'johndoe' } as chat.User,
      blockedUsers: [],
      sentMessagesByUser: {},
    });
  });

  it('should return items array', () => {
    const { result } = renderHook(() => useChatRoomMessages());

    expect(Array.isArray(result.current.items)).toBe(true);
  });

  it('should return isLoading state', () => {
    const { result } = renderHook(() => useChatRoomMessages());

    expect(typeof result.current.isLoading).toBe('boolean');
  });

  it('should return contactUser', () => {
    const { result } = renderHook(() => useChatRoomMessages());

    expect(result.current.contactUser).toEqual({
      id: 2,
      name: 'John Doe',
      username: 'johndoe',
    });
  });

  it('should return null contactUser when none selected', () => {
    useChatStore.setState({ selectedContactUser: null });

    const { result } = renderHook(() => useChatRoomMessages());

    expect(result.current.contactUser).toBeNull();
  });
});
