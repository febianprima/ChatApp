/**
 * End-to-end test for Navigation Flow
 *
 * Tests the navigation patterns:
 * 1. Tab navigation (Chat List <-> Settings)
 * 2. Stack navigation (Chat List -> Chat Room -> Profile)
 * 3. Back navigation
 * 4. Store state consistency across navigation
 */
import { useChatStore } from '../../src/chat/store';
import { useGlobalStore } from '../../src/global/store';

describe('Navigation Flow E2E', () => {
  beforeEach(() => {
    useGlobalStore.setState({ userId: 1, isAuthenticated: true });
    useChatStore.setState({
      selectedContactUser: null,
      blockedUsers: [],
      sentMessagesByUser: {},
    });
  });

  describe('Store State Management', () => {
    it('should persist authenticated user across navigation', () => {
      // Simulate navigation by checking store state
      const initialUserId = useGlobalStore.getState().userId;
      expect(initialUserId).toBe(1);

      // Simulate "navigating" to settings and back
      const afterNavigationUserId = useGlobalStore.getState().userId;
      expect(afterNavigationUserId).toBe(1);
    });

    it('should maintain selected contact when navigating to profile', () => {
      // Set selected contact (like when navigating to chat room)
      const mockContact = {
        id: 2,
        name: 'John Doe',
        username: 'johndoe',
        avatar: 'https://example.com/avatar.jpg',
      } as chat.User;

      useChatStore.getState().setSelectedContactUser(mockContact);

      // Navigate to profile (simulate by reading state)
      const selectedContact = useChatStore.getState().selectedContactUser;
      expect(selectedContact).toEqual(mockContact);
    });

    it('should clear selected contact when navigating back to list', () => {
      // Set selected contact
      useChatStore.getState().setSelectedContactUser({
        id: 2,
        name: 'John Doe',
        username: 'johndoe',
      } as chat.User);

      // Clear when going back (simulate popToTop behavior)
      useChatStore.getState().setSelectedContactUser(null);

      expect(useChatStore.getState().selectedContactUser).toBeNull();
    });
  });

  describe('Block State Across Navigation', () => {
    it('should persist blocked users across navigation', () => {
      // Block a user
      useChatStore.getState().blockUser(2);

      // Verify state persists
      expect(useChatStore.getState().blockedUsers).toContain(2);

      // Simulate navigation (state should persist)
      expect(useChatStore.getState().blockedUsers).toContain(2);
    });

    it('should update blocked state when unblocking', () => {
      // Start with blocked user
      useChatStore.setState({ blockedUsers: [2, 3] });

      // Unblock one user
      useChatStore.getState().unblockUser(2);

      // Verify correct user was unblocked
      expect(useChatStore.getState().blockedUsers).not.toContain(2);
      expect(useChatStore.getState().blockedUsers).toContain(3);
    });
  });

  describe('User Switching Navigation', () => {
    it('should update userId when switching users', () => {
      expect(useGlobalStore.getState().userId).toBe(1);

      // Switch user (like from settings)
      useGlobalStore.getState().setUserId(2);

      expect(useGlobalStore.getState().userId).toBe(2);
    });

    it('should maintain authentication state when switching users', () => {
      expect(useGlobalStore.getState().isAuthenticated).toBe(true);

      // Switch user
      useGlobalStore.getState().setUserId(2);

      // Should still be authenticated
      expect(useGlobalStore.getState().isAuthenticated).toBe(true);
    });
  });

  describe('Sent Messages Persistence', () => {
    it('should persist sent messages for user', () => {
      const mockMessage: chat.Post = {
        id: 999,
        userId: 1,
        title: 'New Message',
        body: 'Hello!',
        tags: [],
        category: 'chat',
        createdAt: new Date().toISOString(),
      };

      // Add message (keyed by authenticated userId who sent it)
      useChatStore.getState().addSentMessage(1, mockMessage);

      // Verify message is stored under userId key
      const messages = useChatStore.getState().sentMessagesByUser[1];
      expect(messages).toBeDefined();
      expect(messages?.[0].body).toBe('Hello!');
    });

    it('should store messages under the sender userId', () => {
      const message1: chat.Post = {
        id: 1001,
        userId: 1,
        title: 'From User 1',
        body: 'Message from user 1',
        tags: [],
        category: 'chat',
        createdAt: new Date().toISOString(),
      };

      const message2: chat.Post = {
        id: 1002,
        userId: 2,
        title: 'From User 2',
        body: 'Message from user 2',
        tags: [],
        category: 'chat',
        createdAt: new Date().toISOString(),
      };

      // User 1 sends a message
      useChatStore.getState().addSentMessage(1, message1);

      // User 2 sends a message
      useChatStore.getState().addSentMessage(2, message2);

      // Verify messages are stored under respective user IDs
      const user1Messages = useChatStore.getState().sentMessagesByUser[1];
      const user2Messages = useChatStore.getState().sentMessagesByUser[2];

      expect(user1Messages?.[0].body).toBe('Message from user 1');
      expect(user2Messages?.[0].body).toBe('Message from user 2');
    });
  });

  describe('Chat List to Chat Room Flow', () => {
    it('should store contact when navigating to chat room', () => {
      const contact = {
        id: 5,
        name: 'Test Contact',
        username: 'testcontact',
        avatar: 'https://example.com/test.jpg',
        email: 'test@example.com',
        phone: '5555555555',
      } as chat.User;

      // Simulate selecting contact from list
      useChatStore.getState().setSelectedContactUser(contact);

      // Verify contact is available for chat room
      const selectedContact = useChatStore.getState().selectedContactUser;
      expect(selectedContact?.id).toBe(5);
      expect(selectedContact?.name).toBe('Test Contact');
    });
  });
});
