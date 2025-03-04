import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import Common from "../util/Common"; // Common 모듈 import (경로에 맞게 수정)
import { clearTokens } from "../redux/authSlice";

const JwtAxios: AxiosInstance = axios.create({
  baseURL: Common.FINAL_DOMAIN,
});

// 요청 인터셉터 추가
JwtAxios.interceptors.request.use(
  async (
    config: InternalAxiosRequestConfig<any>
  ): Promise<InternalAxiosRequestConfig<any>> => {
    console.log("JwtAxios 요청 인터셉터");
    const accessToken = Common.getAccessToken();
    if (accessToken) {
      // accessToken이 null 또는 undefined가 아닌 경우에만 헤더에 추가
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error: AxiosError) => {
    console.log("JwtAxios 요청 에러: ", error);
    return Promise.reject(error);
  }
);

let isRefreshing: boolean = false;
let refreshSubscribers: ((newToken: string | null) => void)[] = []; // 콜백 함수 타입 명시 (newToken: string | null)

const onRrefreshed = (newToken: string | null) => {
  // 파라미터 타입 변경 (string | null)
  refreshSubscribers.forEach((callback) => callback(newToken));
  refreshSubscribers = [];
};

const addSubscriber = (callback: (newToken: string | null) => void) => {
  // 파라미터 타입 변경 (string | null)
  refreshSubscribers.push(callback);
};

// 응답 인터셉터 추가
JwtAxios.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => {
    console.log("응답 인터셉터");
    return response;
  },
  async (error: AxiosError): Promise<AxiosResponse | AxiosError | null> => {
    // 반환 타입 명시 (AxiosResponse | AxiosError | null)
    console.log("JwtAxios 응답 에러: ", error);

    const originalRequest = error.config as AxiosRequestConfig & {
      _retry?: boolean;
    };

    if (
      error.response &&
      (error.response.status === 401 || error.response.status === 403)
    ) {
      if (!isRefreshing) {
        isRefreshing = true;
        try {
          const newToken = await Common.handleUnauthorized(); // refreshToken 파라미터 제거
          isRefreshing = false;
          console.log("새로운 토큰 : ", newToken);
          if (newToken) {
            onRrefreshed(newToken);
            if (originalRequest) {
              originalRequest.headers = {
                ...originalRequest.headers,
                Authorization: `Bearer ${newToken}`,
              } as Record<string, string>;
              return JwtAxios.request(originalRequest);
            }
          } else {
            console.error("토큰 재발급 실패, 로그아웃 처리:");
            isRefreshing = false;
            localStorage.clear();
            navigateToLogin();
            return Promise.reject(error); // 명시적으로 에러 reject
          }
        } catch (refreshError) {
          // catch 블록에서 에러 변수명 변경 (refreshError)
          console.error("토큰 재발급 API 요청 실패:", refreshError); // 더 구체적인 에러 메시지
          isRefreshing = false;
          localStorage.clear();
          navigateToLogin();
          return Promise.reject(refreshError); // 재발급 API 에러 reject
        }
      }

      return new Promise((resolve) => {
        addSubscriber((newToken) => {
          if (originalRequest && newToken) {
            // newToken null 체크 추가
            originalRequest.headers = {
              ...originalRequest.headers,
              Authorization: `Bearer ${newToken}`,
            } as Record<string, string>;
            resolve(JwtAxios.request(originalRequest));
          } else {
            resolve(Promise.reject("토큰 재발급 실패로 인한 요청 재시도 중단")); // newToken null 경우 reject
          }
        });
      });
    }
    return Promise.reject(error);
  }
);

export default JwtAxios;

const navigateToLogin = (): void => {
  window.location.href = "/";
};
