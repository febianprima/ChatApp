import { useGlobalStore } from '../../../global/store';

// Tests for useGetUsers - testing the filtering logic
describe('useGetUsers', () => {
  const mockUsers = [
    { id: 1, name: 'User One', username: 'user1' },
    { id: 2, name: 'User Two', username: 'user2' },
    { id: 3, name: 'User Three', username: 'user3' },
  ];

  beforeEach(() => {
    useGlobalStore.setState({ userId: 1, isAuthenticated: true });
  });

  it('should filter out current user when includeCurrentUser is false', () => {
    const currentUserId = useGlobalStore.getState().userId;
    const includeCurrentUser = false;

    const filteredUsers = includeCurrentUser
      ? mockUsers
      : mockUsers.filter(user => user.id !== currentUserId);

    expect(filteredUsers).toHaveLength(2);
    expect(filteredUsers.map(u => u.id)).not.toContain(1);
    expect(filteredUsers.map(u => u.id)).toContain(2);
    expect(filteredUsers.map(u => u.id)).toContain(3);
  });

  it('should include current user when includeCurrentUser is true', () => {
    const currentUserId = useGlobalStore.getState().userId;
    const includeCurrentUser = true;

    const filteredUsers = includeCurrentUser
      ? mockUsers
      : mockUsers.filter(user => user.id !== currentUserId);

    expect(filteredUsers).toHaveLength(3);
    expect(filteredUsers.map(u => u.id)).toContain(1);
  });

  it('should return all users when no current user is set', () => {
    useGlobalStore.setState({ userId: undefined });
    const currentUserId = useGlobalStore.getState().userId;
    const includeCurrentUser = false;

    const filteredUsers = includeCurrentUser
      ? mockUsers
      : mockUsers.filter(user => user.id !== currentUserId);

    expect(filteredUsers).toHaveLength(3);
  });

  it('should flatten pages correctly', () => {
    const mockPages = [
      { results: [{ id: 1, name: 'User 1' }], total: 3, offset: 0, limit: 1 },
      { results: [{ id: 2, name: 'User 2' }], total: 3, offset: 1, limit: 1 },
      { results: [{ id: 3, name: 'User 3' }], total: 3, offset: 2, limit: 1 },
    ];

    const allUsers = mockPages.flatMap(page => page.results);

    expect(allUsers).toHaveLength(3);
    expect(allUsers[0].id).toBe(1);
    expect(allUsers[2].id).toBe(3);
  });
});
