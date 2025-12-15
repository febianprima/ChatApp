import { useGlobalStore } from '../globalStore';

describe('globalStore', () => {
  beforeEach(() => {
    // Reset store to initial state before each test
    useGlobalStore.setState({
      isAuthenticated: true,
      userId: 1,
    });
  });

  it('has correct initial state', () => {
    const state = useGlobalStore.getState();

    expect(state.isAuthenticated).toBe(true);
    expect(state.userId).toBe(1);
  });

  it('setUserId updates userId', () => {
    const { setUserId } = useGlobalStore.getState();

    setUserId(5);

    expect(useGlobalStore.getState().userId).toBe(5);
  });

  it('setAuthenticated updates isAuthenticated', () => {
    const { setAuthenticated } = useGlobalStore.getState();

    setAuthenticated(false);

    expect(useGlobalStore.getState().isAuthenticated).toBe(false);
  });

  it('reset returns store to initial state', () => {
    const { setUserId, setAuthenticated, reset } = useGlobalStore.getState();

    // Change state
    setUserId(10);
    setAuthenticated(false);

    // Reset
    reset();

    const state = useGlobalStore.getState();
    expect(state.isAuthenticated).toBe(true);
    expect(state.userId).toBe(1);
  });
});
