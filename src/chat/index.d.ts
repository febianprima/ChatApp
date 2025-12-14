declare namespace chat {
  //#region store type
  interface Store extends chat.State, chat.Actions {}

  interface State {
    selectedContactUser: User | null;
    blockedUsers: User['id'][];
  }

  interface Actions {
    setSelectedContactUser: (selectedContactUser: User | null) => void;
    blockUser: (userId: User['id']) => void;
    unblockUser: (userId: User['id']) => void;
  }
  //#endregion

  //#region user type
  interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    avatar: string;
    phone: string;
    website: string;
  }
  interface Address {
    street: string;
    city: string;
    zipcode: string;
  }
  interface FetchUsersResponse {
    total: number;
    limit: number;
    offset: number;
    results: User[];
  }
  //#endregion

  //#region post type
  interface Post {
    id: number;
    userId: number;
    title: string;
    body: string;
    tags: string[];
    category: string;
    createdAt: string;
  }
  interface FetchPostsResponse {
    total: number;
    limit: number;
    offset: number;
    results: Post[];
  }
  //#endregion

  //#region navigation type
  type ChatStackParamList = {
    ChatList: undefined;
    ChatRoom: undefined;
    Profile: undefined;
  };
  //#endregion

  //#region hooks type
  interface ContactItem {
    icon: string;
    value: string;
    onPress: () => void;
  }
  //#endregion
}
