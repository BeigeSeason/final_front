import { LOGOUT } from "./axtions";

const initialState = {
  accessToken: null,
  refreshToken: null,
};

// 액션 타입 정의
type AuthAction = { type: typeof LOGOUT };

const authReducer = (state = initialState, action: AuthAction) => {
  switch (action.type) {
    case LOGOUT:
      localStorage.removeItem("accessToken"); // 로컬 스토리지에서 토큰 제거
      return {
        ...state,
        accessToken: null,
        refreshToken: null,
      };
    default:
      return state;
  }
};

export default authReducer;
