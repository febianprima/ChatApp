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

const mockPost: chat.Post = {
  id: 100,
  userId: 1,
  title: 'Test Post',
  body: 'Test body',
  tags: [],
  category: 'test',
  createdAt: '2024-01-01T00:00:00Z',
};

describe('useChatStore', () => {
  beforeEach(() => {
    // Reset store to initial state before each test
    useChatStore.setState({
      selectedContactUser: null,
      blockedUsers: [],
      sentMessagesByUser: {},
    });
  });

  it('has correct initial state', () => {
    const state = useChatStore.getState();

    expect(state.selectedContactUser).toBeNull();
    expect(state.blockedUsers).toEqual([]);
    expect(state.sentMessagesByUser).toEqual({});
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

  it('addSentMessage adds message to sentMessagesByUser for specific userId', () => {
    const { addSentMessage } = useChatStore.getState();

    addSentMessage(1, mockPost);

    expect(useChatStore.getState().sentMessagesByUser[1]).toEqual([mockPost]);
  });

  it('addSentMessage adds multiple messages for same userId', () => {
    const { addSentMessage } = useChatStore.getState();
    const mockPost2 = { ...mockPost, id: 101, body: 'Second post' };

    addSentMessage(1, mockPost);
    addSentMessage(1, mockPost2);

    // Newest first
    expect(useChatStore.getState().sentMessagesByUser[1]).toEqual([mockPost2, mockPost]);
  });

  it('addSentMessage keeps messages separate per userId', () => {
    const { addSentMessage } = useChatStore.getState();
    const mockPost2 = { ...mockPost, id: 101, userId: 2 };

    addSentMessage(1, mockPost);
    addSentMessage(2, mockPost2);

    expect(useChatStore.getState().sentMessagesByUser[1]).toEqual([mockPost]);
    expect(useChatStore.getState().sentMessagesByUser[2]).toEqual([mockPost2]);
  });
});
