import axios from "axios";
import { API_BASE_URL } from "../util/Common";
import { ReportData } from "../types/CommonTypes";
import { DiaryData, DiaryInfo } from "../types/DiaryTypes";
import JwtAxios from "./JwtAxios";

export const DiaryApi = {
  postDiary: async (data: DiaryData): Promise<boolean> => {
    console.log(data);
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
  reportDiary: async (data: ReportData): Promise<boolean> => {
    try {
      return (await JwtAxios.post(`${API_BASE_URL}/report`, data)).data;
    } catch (error) {
      console.log("다이어리 신고 중 오류");
      return false;
    }
  },
};
