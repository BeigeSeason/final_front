import axios from "axios";
import { API_BASE_URL } from "../util/Common";
import JwtAxios from "./JwtAxios";

interface DiaryData {
  diaryId: string;
  title: string;
  region: string;
  startDate: string | null;
  endDate: string | null;
  tags: string[];
  totalCost: number;
  content: string;
  userId: string;
  isPublic: boolean;
}

export const DiaryApi = {
  // 수정해야되는 문제
  // 1. diary 생성할 때 날짜만 들어가는 문제
  // 2. 년월일만 들어가서 back에서 diary 조회할 때 오류남
  postDiary: async (data: DiaryData): Promise<boolean> => {
    try {
      return (await JwtAxios.post(`${API_BASE_URL}/diary/post-diary`, data))
        .data;
    } catch (error) {
      console.log("다이어리 생성중 api 오류");
      throw error;
    }
  },
  diaryDetail: async (diaryId: string): Promise<DiaryData> => {
    console.log(diaryId);
    try {
      return (await axios.get(`${API_BASE_URL}/diary/diary-detail/${diaryId}`))
        .data;
    } catch (error) {
      console.log("다이어리 상세 조회 중 api 오류");
      throw error;
    }
  },
};
