declare namespace global {
  //#region store type
  interface Store extends global.State, global.Actions {}

  interface State {
    isAuthenticated: boolean;
    userId: number;
  }

  interface Actions {
    setAuthenticated: (isAuthenticated: boolean) => void;
    setUserId: (userId: number) => void;
    reset: () => void;
  }
  //#endregion

  //#region snackbar type
  type SnackbarType = 'info' | 'success' | 'error';

  interface SnackbarState {
    visible: boolean;
    message: string;
    type: SnackbarType;
  }

  interface SnackbarStore extends SnackbarState {
    show: (message: string, type?: SnackbarType) => void;
    hide: () => void;
  }
  //#endregion

  //#region components type
  interface BottomSheetOption {
    icon?: string;
    avatar?: string;
    label: string;
    subtitle?: string;
    onPress: () => void;
    destructive?: boolean;
  }
  //#endregion

  //#region navigation type
  type BottomTabParamList = {
    ChatTab: undefined;
    SettingsTab: undefined;
  };

  type SettingsStackParamList = {
    Settings: undefined;
  };
  //#endregion
}
