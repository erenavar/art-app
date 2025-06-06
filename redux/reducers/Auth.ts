import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserType, AuthState } from "../types/Auth";

const initialState: AuthState = {
  authenticated: false,
  UserType: UserType.COLLECTOR,
  username: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.authenticated = action.payload;
    },
    setUserType: (state, action: PayloadAction<UserType>) => {
      state.UserType = action.payload;
    },
    setUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
  },
});

export const { setAuthenticated, setUserType, setUsername } = authSlice.actions;

export default authSlice.reducer;
