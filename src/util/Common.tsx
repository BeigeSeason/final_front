import axios, { AxiosResponse } from "axios";

export const API_BASE_URL = "http://localhost:8111";

interface Token {
  accessToken: string | null;
  refreshToken: string | null;
}

const Common = {
  FINAL_DOMAIN: "http://localhost:8111",

  getAccessToken: (): string | null => {
    return localStorage.getItem("accessToken");
  },
  setAccessToken: (token: string | null): void => {
    if (typeof token === "string") {
      localStorage.setItem("accessToken", token);
    }
  },
  getRefreshToken: (): string | null => {
    return localStorage.getItem("refreshToken");
  },
  setRefreshToken: (token: string | null): void => {
    if (typeof token === "string") {
      localStorage.setItem("refreshToken", token);
    }
  },

  handleUnauthorized: async (): Promise<string | null> => {
    // refreshToken 파라미터 제거 및 반환 타입 명확화 (string | null)
    console.log("401 에러 처리 함수 실행됨");
    const refreshToken = Common.getRefreshToken(); // Common.getRefreshToken() 사용
    if (!refreshToken) {
      console.log("refreshToken 이 없습니다.");
      return null; // refreshToken 없는 경우 null 반환으로 변경 (명확성)
    }
    try {
      const response: AxiosResponse<Token> = await axios.post(
        // POST 요청으로 변경 (일반적인 refreshToken API 방식)
        `${Common.FINAL_DOMAIN}/auth//token-refreshing`, // refreshToken API 엔드포인트 (POST body로 refreshToken 전달)
        { refreshToken: refreshToken }, // 요청 body에 refreshToken 전달
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("토큰 재발급 성공:", response.data);
      Common.setAccessToken(response.data.accessToken);
      //Common.setRefreshToken(response.data.refreshToken); // refreshToken 갱신 (backend에서 함께 갱신하여 응답한다고 가정)
      return response.data.accessToken;
    } catch (error) {
      console.error("토큰 재발급 실패:", error);
      return null; // 실패 시 null 반환으로 변경 (명확성)
    }
  },
};

export default Common;
