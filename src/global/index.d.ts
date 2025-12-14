declare namespace global {
  //#region store type
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
  //#endregion

  //#region components type
  interface BottomSheetOption {
    icon?: string;
    label: string;
    onPress: () => void;
    destructive?: boolean;
  }
  //#endregion

  //#region navigation type
  type BottomTabParamList = {
    ChatTab: undefined;
    SettingsTab: undefined;
  };
  //#endregion
}
