import { create } from 'zustand';

const initialState: chat.State = {
  selectedContactUser: null,
  blockedUsers: [],
};

export const useChatStore = create<chat.Store>(set => ({
  ...initialState,

  setSelectedContactUser: selectedContactUser => set({ selectedContactUser }),
  blockUser: userId => set(state => ({ blockedUsers: [...state.blockedUsers, userId] })),
  unblockUser: userId =>
    set(state => ({ blockedUsers: state.blockedUsers.filter(id => id !== userId) })),
}));
