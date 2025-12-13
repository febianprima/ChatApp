import { create } from 'zustand';

interface AppState {
  // Auth state
  isAuthenticated: boolean;
  userId: string | null;

  // Actions
  setAuthenticated: (isAuthenticated: boolean) => void;
  setUserId: (userId: string | null) => void;
  reset: () => void;
}

const initialState = {
  isAuthenticated: false,
  userId: null,
};

export const useAppStore = create<AppState>(set => ({
  ...initialState,

  setAuthenticated: isAuthenticated => set({ isAuthenticated }),
  setUserId: userId => set({ userId }),
  reset: () => set(initialState),
}));
