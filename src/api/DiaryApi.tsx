import axios from "axios";
import { API_BASE_URL } from "../util/Common";
import JwtAxios from "./JwtAxios";

export interface DiaryData {
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

export interface DiaryInfo {
  diaryId: string;
  title: string;
  region: string;
  createdTime: Date | null;
  startDate: string | null;
  endDate: string | null;
  tags: string[];
  totalCost: number;
  content: string;
  nickname: string;
  ownerId: string;
  profileImgPath: string | null;
  public: boolean;
}

export interface ReportData {
  reportType: string; // "DIARY"
  reporter: string; // 신고자 id
  reported: string; // 신고 대상 id
  reportEntity: string; // 다이어리 id
  reason: string;
}

export const DiaryApi = {
  postDiary: async (data: DiaryData): Promise<boolean> => {
    try {
      return (await JwtAxios.post(`${API_BASE_URL}/diary/post-diary`, data))
        .data;
    } catch (error) {
      console.log("다이어리 생성중 api 오류");
      return false;
    }
  },
  editDiary: async (data: DiaryData): Promise<boolean> => {
    console.log(data);
    try {
      return (await JwtAxios.put(`${API_BASE_URL}/diary/edit-diary`, data))
        .data;
    } catch (error) {
      console.log("다이어리 수정중 api 오류");
      return false;
    }
  },
  deleteDiary: async (diaryId: string): Promise<boolean> => {
    console.log(diaryId);
    try {
      return (await JwtAxios.delete(`${API_BASE_URL}/diary/delete/${diaryId}`))
        .data;
    } catch (error) {
      console.log("다이어리 삭제 중 api 오류");
      return false;
    }
  },
  diaryDetail: async (diaryId: string): Promise<DiaryInfo> => {
    console.log(diaryId);
    try {
      return (await axios.get(`${API_BASE_URL}/diary/diary-detail/${diaryId}`))
        .data;
    } catch (error) {
      console.log("다이어리 상세 조회 중 api 오류");
      throw error;
    }
  },
  changeIsPublic: async (
    diaryId: string,
    isPublic: boolean
  ): Promise<boolean> => {
    try {
      return (
        await JwtAxios.put(
          `${API_BASE_URL}/diary/change-ispublic?diaryId=${diaryId}&isPublic=${isPublic}`
        )
      ).data;
    } catch (error) {
      console.log("다이어리 공개/비공개 전환 중 api 오류");
      return false;
    }
  },
  ReportDiary: async (data: ReportData): Promise<boolean> => {
    try {
      return (await JwtAxios.post(`${API_BASE_URL}/report`, data)).data;
    } catch (error) {
      console.log("다이어리 신고 중 오류");
      return false;
    }
  },
};
