import { create } from 'zustand';

// Default user is userId 1 (no authentication required for this app)
const initialState: global.State = {
  isAuthenticated: true,
  userId: 1,
};

export const useGlobalStore = create<global.Store>(set => ({
  ...initialState,

  setAuthenticated: isAuthenticated => set({ isAuthenticated }),
  setUserId: userId => set({ userId }),
  reset: () => set(initialState),
}));
