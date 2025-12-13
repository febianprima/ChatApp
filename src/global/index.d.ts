declare namespace global {
  interface Store extends global.State, global.Actions {}

  interface State {
    isAuthenticated: boolean;
    userId: string | null;
  }

  interface Actions {
    setAuthenticated: (isAuthenticated: boolean) => void;
    setUserId: (userId: string | null) => void;
    reset: () => void;
  }
}
