import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";

const initialState = {
  auth: {
    accessToken: localStorage.getItem("accessToken") || null,
    refreshToken: localStorage.getItem("refreshToken") || null,
  },
};

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  preloadedState: initialState, // 초기 상태로 설정
});
export type RootState = ReturnType<typeof store.getState>; // 현재 스토어 상태 타입

export default store;
