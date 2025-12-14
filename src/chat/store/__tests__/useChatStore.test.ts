import { useChatStore } from '../useChatStore';

const mockUser: chat.User = {
  id: 1,
  name: 'John Doe',
  username: 'johndoe',
  email: 'john@example.com',
  avatar: 'https://example.com/avatar.jpg',
  phone: '123456789',
  website: 'https://example.com',
};

describe('useChatStore', () => {
  beforeEach(() => {
    // Reset store to initial state before each test
    useChatStore.setState({
      selectedContactUser: null,
      blockedUsers: [],
    });
  });

  it('has correct initial state', () => {
    const state = useChatStore.getState();

    expect(state.selectedContactUser).toBeNull();
    expect(state.blockedUsers).toEqual([]);
  });

  it('setSelectedContactUser updates selectedContactUser', () => {
    const { setSelectedContactUser } = useChatStore.getState();

    setSelectedContactUser(mockUser);

    expect(useChatStore.getState().selectedContactUser).toEqual(mockUser);
  });

  it('setSelectedContactUser can set to null', () => {
    const { setSelectedContactUser } = useChatStore.getState();

    setSelectedContactUser(mockUser);
    setSelectedContactUser(null);

    expect(useChatStore.getState().selectedContactUser).toBeNull();
  });

  it('blockUser adds userId to blockedUsers', () => {
    const { blockUser } = useChatStore.getState();

    blockUser(1);
    blockUser(2);

    expect(useChatStore.getState().blockedUsers).toEqual([1, 2]);
  });

  it('unblockUser removes userId from blockedUsers', () => {
    const { blockUser, unblockUser } = useChatStore.getState();

    blockUser(1);
    blockUser(2);
    blockUser(3);

    unblockUser(2);

    expect(useChatStore.getState().blockedUsers).toEqual([1, 3]);
  });

  it('unblockUser does nothing if userId not in blockedUsers', () => {
    const { blockUser, unblockUser } = useChatStore.getState();

    blockUser(1);
    unblockUser(99);

    expect(useChatStore.getState().blockedUsers).toEqual([1]);
  });
});
