import JwtAxios from "./JwtAxios";
import {AxiosResponse} from "axios";
import axios from "axios";
import Common from "../util/Common";

interface LoginRequest {
    id: string;
    password?: string;
}

interface SignupRequest {
    id: string;
    password?: string;
    name: string;
    email: string;
    nickname: string;
    profileImg?: string; // 프로필 이미지 URL은 선택적 속성
    socialId?: string; // 소셜 ID는 선택적 속성
    sso?: string; // SSO 정보는 선택적 속성
}

const AxiosApi = {
    // 로그인
    // 아직 잘 몰라서 AxiosResponse<any>로 설정함
    login: async (userId: string, password: string): Promise<AxiosResponse<any>> => {
        const loginRequest: LoginRequest = {
            id: userId,
            password: password,
        };
        return await JwtAxios.post("/auth/login", loginRequest);
    },
    // 회원가입
    signup: async (signupRequest: SignupRequest): Promise<AxiosResponse<any>> => {
        try {
            const member: SignupRequest = { // Use SignupRequest interface
                id: signupRequest.id,
                password: signupRequest.password,
                name: signupRequest.name,
                email: signupRequest.email,
                nickname: signupRequest.nickname,
                profileImg: signupRequest.profileImg,
                socialId: signupRequest.socialId,
                sso: signupRequest.sso,
            };
            return await JwtAxios.post("/auth/signup", member);
        } catch (error: any) {
            console.error("Signup Error: ", error);
            throw error;
        }
    },
    // 멤버 조회 (전체)
    memberList: async (page = 1, size = 10, searchType = "NAME", searchValue = "") => {
        console.log("params:", {page, size, searchType, searchValue});
        try {
            const response = await JwtAxios.get("/member/list", {
                params: {page, size, searchType, searchValue},
            });
            return response.data;
        } catch (error) {
            console.error("멤버 리스트 조회 중 오류 발생:", error);
            throw error;
        }
    },
}

export default AxiosApi;
