import { useSnackbarStore } from '../snackbarStore';

describe('snackbarStore', () => {
  beforeEach(() => {
    // Reset store to initial state before each test
    useSnackbarStore.setState({
      visible: false,
      message: '',
      type: 'info',
    });
  });

  describe('initial state', () => {
    it('should have correct initial values', () => {
      const state = useSnackbarStore.getState();

      expect(state.visible).toBe(false);
      expect(state.message).toBe('');
      expect(state.type).toBe('info');
    });
  });

  describe('show', () => {
    it('should show snackbar with message and default type', () => {
      useSnackbarStore.getState().show('Test message');

      const state = useSnackbarStore.getState();
      expect(state.visible).toBe(true);
      expect(state.message).toBe('Test message');
      expect(state.type).toBe('info');
    });

    it('should show snackbar with success type', () => {
      useSnackbarStore.getState().show('Success!', 'success');

      const state = useSnackbarStore.getState();
      expect(state.visible).toBe(true);
      expect(state.message).toBe('Success!');
      expect(state.type).toBe('success');
    });

    it('should show snackbar with error type', () => {
      useSnackbarStore.getState().show('Error occurred', 'error');

      const state = useSnackbarStore.getState();
      expect(state.visible).toBe(true);
      expect(state.message).toBe('Error occurred');
      expect(state.type).toBe('error');
    });
  });

  describe('hide', () => {
    it('should hide snackbar', () => {
      // First show
      useSnackbarStore.getState().show('Test message');
      expect(useSnackbarStore.getState().visible).toBe(true);

      // Then hide
      useSnackbarStore.getState().hide();
      expect(useSnackbarStore.getState().visible).toBe(false);
    });

    it('should preserve message and type when hiding', () => {
      useSnackbarStore.getState().show('Test message', 'error');
      useSnackbarStore.getState().hide();

      const state = useSnackbarStore.getState();
      expect(state.visible).toBe(false);
      expect(state.message).toBe('Test message');
      expect(state.type).toBe('error');
    });
  });
});
