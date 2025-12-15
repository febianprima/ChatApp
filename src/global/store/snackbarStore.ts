import { create } from 'zustand';

const initialState: global.SnackbarState = {
  visible: false,
  message: '',
  type: 'info',
};

export const useSnackbarStore = create<global.SnackbarStore>(set => ({
  ...initialState,

  show: (message, type = 'info') => set({ visible: true, message, type }),
  hide: () => set({ visible: false }),
}));
