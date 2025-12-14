declare namespace global {
  //#region store type
  interface Store extends global.State, global.Actions {}

  interface State {
    isAuthenticated: boolean;
    userId: number | null;
  }

  interface Actions {
    setAuthenticated: (isAuthenticated: boolean) => void;
    setUserId: (userId: number | null) => void;
    reset: () => void;
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
