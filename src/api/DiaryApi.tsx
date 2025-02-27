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
  postDiary: async (data: DiaryData): Promise<boolean> => {
    try {
      return (await JwtAxios.post(`${API_BASE_URL}/diary/post-diary`, data))
        .data;
    } catch (error) {
      throw error;
    }
  },
};
