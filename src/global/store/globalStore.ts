import { create } from 'zustand';

const initialState: global.State = {
  isAuthenticated: false,
  userId: null,
};

export const useGlobalStore = create<global.Store>(set => ({
  ...initialState,

  setAuthenticated: isAuthenticated => set({ isAuthenticated }),
  setUserId: userId => set({ userId }),
  reset: () => set(initialState),
}));
