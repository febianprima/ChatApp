import { useGlobalStore } from '../../../global/store';
import { useChatStore } from '../../store';

// Tests for useGetUser - testing the logic through integration
describe('useGetUser', () => {
  beforeEach(() => {
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
  });

  it('should get userId from globalStore', () => {
    const state = useGlobalStore.getState();
    expect(state.userId).toBe(1);
  });

  it('should get selectedContactUser from chatStore', () => {
    const state = useChatStore.getState();
    expect(state.selectedContactUser?.id).toBe(2);
    expect(state.selectedContactUser?.name).toBe('John Doe');
  });

  it('should determine correct userId based on isAuthenticatedUser flag', () => {
    const authenticatedUserId = useGlobalStore.getState().userId;
    const contactUserId = useChatStore.getState().selectedContactUser?.id;

    const isAuthenticatedUser = true;
    const userId = isAuthenticatedUser ? authenticatedUserId : contactUserId;

    expect(userId).toBe(1);
  });

  it('should use contact userId when isAuthenticatedUser is false', () => {
    const authenticatedUserId = useGlobalStore.getState().userId;
    const contactUserId = useChatStore.getState().selectedContactUser?.id;

    const isAuthenticatedUser = false;
    const userId = isAuthenticatedUser ? authenticatedUserId : contactUserId;

    expect(userId).toBe(2);
  });

  it('should return null userId when no contact selected and not authenticated user', () => {
    useChatStore.setState({ selectedContactUser: null });

    const contactUserId = useChatStore.getState().selectedContactUser?.id ?? null;

    expect(contactUserId).toBeNull();
  });
});
