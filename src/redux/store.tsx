import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>; // 현재 스토어 상태 타입
export type AppDispatch = typeof store.dispatch; // 디스패치 타입 추가(useDispatch 타입 안전성을 위해)
export default store;
