import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState, AuthType } from "../types/Auth";

const initialState: AuthState = {
  authenticated: false,
  authType: AuthType.EMAIL,
  username: "",
  email: " ",
  profileImgUrl: "",
  fullName: "",
  code: ["", "", "", ""],
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.authenticated = action.payload;
    },
    setAuthType: (state, action: PayloadAction<AuthType>) => {
      state.authType = action.payload;
    },
    setUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
    setEmail: (state, action: PayloadAction<string | null>) => {
      state.email = action.payload;
    },
    setProfileImgUrl: (state, action: PayloadAction<string | null>) => {
      state.profileImgUrl = action.payload;
    },
    setFullName: (state, action: PayloadAction<string | null>) => {
      state.fullName = action.payload;
    },
    setCode: (state, action: PayloadAction<Array<string>>) => {
      state.code = action.payload;
    },
  },
});

export const {
  setAuthenticated,
  setAuthType,
  setUsername,
  setEmail,
  setProfileImgUrl,
  setFullName,
  setCode,
} = authSlice.actions;

export default authSlice.reducer;
