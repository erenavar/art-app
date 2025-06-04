export enum UserType {
  COLLECTOR = "collector",
  ARTIST = "artist",
}

export interface AuthState {
  authenticated: boolean;
  UserType: UserType;
  username: string;
}
