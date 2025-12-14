import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

const initialState: chat.State = {
  selectedContactUser: null,
  blockedUsers: [],
  sentMessagesByUser: {},
};

export const useChatStore = create<chat.Store>()(
  persist(
    set => ({
      ...initialState,

      setSelectedContactUser: selectedContactUser => set({ selectedContactUser }),
      blockUser: userId => set(state => ({ blockedUsers: [...state.blockedUsers, userId] })),
      unblockUser: userId =>
        set(state => ({ blockedUsers: state.blockedUsers.filter(id => id !== userId) })),
      addSentMessage: (userId, message) =>
        set(state => ({
          sentMessagesByUser: {
            ...state.sentMessagesByUser,
            [userId]: [message, ...(state.sentMessagesByUser[userId] ?? [])],
          },
        })),
    }),
    {
      name: 'chat-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: state => ({
        blockedUsers: state.blockedUsers,
        sentMessagesByUser: state.sentMessagesByUser,
      }),
    },
  ),
);
