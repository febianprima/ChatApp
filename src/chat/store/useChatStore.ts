import { create } from 'zustand';

const initialState: chat.State = {
  contactUserId: NaN,
};

export const useChatStore = create<chat.Store>(set => ({
  ...initialState,

  setContactUserId: contactUserId => set({ contactUserId }),
}));
