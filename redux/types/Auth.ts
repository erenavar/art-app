export enum AuthType {
  EMAIL = "email",
  GOOGLE = "google",
  APPLE = "apple",
}

export interface AuthState {
  authenticated: boolean;
  authType: AuthType;
  username: string;
  email: string | null;
  profileImgUrl: string | null;
  fullName: string | null;
}
