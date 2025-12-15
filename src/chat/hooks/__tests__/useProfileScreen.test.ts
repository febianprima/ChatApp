import { renderHook } from '@testing-library/react-native';

import { useChatStore } from '../../store';

import { useProfileScreen } from '../useProfileScreen';

// Mock navigation
const mockGoBack = jest.fn();
const mockPopToTop = jest.fn();
const mockReplace = jest.fn();

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    canGoBack: () => true,
    goBack: mockGoBack,
    popToTop: mockPopToTop,
    replace: mockReplace,
  }),
}));

// Mock the query
jest.mock('../../queries', () => ({
  useGetUser: jest.fn(() => ({
    data: {
      id: 2,
      name: 'John Doe',
      username: 'johndoe',
      email: 'john@example.com',
      phone: '1234567890',
      website: 'https://johndoe.com',
      avatar: 'https://example.com/avatar.jpg',
    },
    isLoading: false,
  })),
}));

describe('useProfileScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    useChatStore.setState({
      selectedContactUser: null,
      blockedUsers: [],
      sentMessagesByUser: {},
    });
  });

  it('should return userData', () => {
    const { result } = renderHook(() => useProfileScreen());

    expect(result.current.userData).toEqual({
      id: 2,
      name: 'John Doe',
      username: 'johndoe',
      email: 'john@example.com',
      phone: '1234567890',
      website: 'https://johndoe.com',
      avatar: 'https://example.com/avatar.jpg',
    });
  });

  it('should return isLoading state', () => {
    const { result } = renderHook(() => useProfileScreen());

    expect(result.current.isLoading).toBe(false);
  });

  it('should return menu state and handlers', () => {
    const { result } = renderHook(() => useProfileScreen());

    expect(result.current.isMenuVisible).toBe(false);
    expect(typeof result.current.openMenu).toBe('function');
    expect(typeof result.current.closeMenu).toBe('function');
  });

  it('should return contact items', () => {
    const { result } = renderHook(() => useProfileScreen());

    expect(result.current.contactItems).toHaveLength(3);
    expect(result.current.contactItems[0].icon).toBe('📞');
    expect(result.current.contactItems[1].icon).toBe('✉️');
    expect(result.current.contactItems[2].icon).toBe('🌐');
  });

  it('should return menu options', () => {
    const { result } = renderHook(() => useProfileScreen());

    expect(result.current.menuOptions).toHaveLength(1);
    expect(result.current.menuOptions[0].label).toBe('Block User');
  });

  it('should return unblock option when user is blocked', () => {
    useChatStore.setState({ blockedUsers: [2] });

    const { result } = renderHook(() => useProfileScreen());

    expect(result.current.menuOptions[0].label).toBe('Unblock User');
  });
});
