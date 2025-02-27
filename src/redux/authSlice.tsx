// src/redux/authSlice.ts
import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  userId: string | null;
  nickname: string | null;
  name: string | null;
  email: string | null;
  profile: string | null;
}

const initialState: AuthState = {
  accessToken: localStorage.getItem("accessToken") || null,
  refreshToken: localStorage.getItem("refreshToken") || null,
  userId: null,
  nickname: null,
  name: null,
  email: null,
  profile: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setTokens: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      localStorage.setItem("accessToken", action.payload.accessToken);
      localStorage.setItem("refreshToken", action.payload.refreshToken);
    },
    setUserInfo: (state, action) => {
      state.userId = action.payload.userId;
      state.nickname = action.payload.nickname;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.profile = action.payload.profile;
    },
    clearTokens: (state) => {
      state.accessToken = null;
      state.refreshToken = null;
      state.userId = null;
      state.nickname = null;
      state.name = null;
      state.email = null;
      state.profile = null;
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    },
  },
});

export const { setTokens, setUserInfo, clearTokens } = authSlice.actions;
export default authSlice.reducer;
