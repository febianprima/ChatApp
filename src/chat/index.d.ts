declare namespace chat {
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
}
