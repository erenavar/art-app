import { createSlice } from "@reduxjs/toolkit";
import { UserType } from "../types/Auth";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    authenticated: false,
    UserType: UserType.COLLECTOR,
    username: "",
  },
  reducers: {
    selectAuthenticated: (state, action) => {
      state.authenticated = action.payload;
    },
    selectUserType: (state, action) => {
      state.UserType = action.payload;
    },
    selectUsername: (state, action) => {
      state.username = action.payload;
    },
  },
});

export const { selectAuthenticated, selectUserType, selectUsername } =
  authSlice.actions;

export default authSlice.reducer;
