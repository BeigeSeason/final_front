import axios from "axios";
import { API_BASE_URL } from "../util/Common";
import {
  TourSpotApiFilters,
  TourSpotResponse,
  DiaryApiFilters,
  UserDiary,
  DiaryResponse,
  TourSpotDetailDto,
  AddBookmarkData,
} from "../types/ItemTypes";
import JwtAxios from "./JwtAxios";

export const ItemApi = {
  getTourSpotList: async (
    filters: TourSpotApiFilters = {}
  ): Promise<TourSpotResponse> => {
    try {
      const response = await axios.get<TourSpotResponse>(
        `${API_BASE_URL}/search/tour-list`,
        {
          params: filters,
        }
      );
      return response.data;
    } catch (error) {
      console.error("여행지 데이터 조회 오류:", error);
      throw error;
    }
  },
  getTourSpotDetail: async (tourSpotId: string): Promise<TourSpotDetailDto> => {
    try {
      const response = await axios.get<TourSpotDetailDto>(
        `${API_BASE_URL}/search/spot-detail`,
        {
          params: { tourSpotId }, // 'tourSpotId'로 전달
        }
      );
      return response.data;
    } catch (error) {
      console.error("관광지 상세 정보 조회 오류:", error);
      throw error;
    }
  },
  getDiaryList: async (
    filters: DiaryApiFilters = {}
  ): Promise<DiaryResponse> => {
    try {
      const response = await axios.get<DiaryResponse>(
        `${API_BASE_URL}/search/diary-list`,
        {
          params: filters,
        }
      );
      return response.data;
    } catch (error) {
      console.error("다이어리 데이터 조회 오류:", error);
      throw error;
    }
  },
  // 특정 유저 다이어리 목록 조회
  getMyDiaryList: async (params: UserDiary): Promise<DiaryResponse> => {
    return (
      await axios.get<DiaryResponse>(`${API_BASE_URL}/search/my-diary-list`, {
        params,
      })
    ).data;
  },
  getOtherUserDiaryList: async (params: UserDiary): Promise<DiaryResponse> => {
    console.log("params : ", params);
    return (
      await axios.get<DiaryResponse>(
        `${API_BASE_URL}/search/otheruser-diary-list`,
        {
          params,
        }
      )
    ).data;
  },
  addBookmark: async (data: AddBookmarkData): Promise<boolean> => {
    try {
      return (
        await JwtAxios.post(
          `${API_BASE_URL}/review-bookmark/add-bookmark`,
          data
        )
      ).data;
    } catch (error) {
      console.log("북마크 추가 중 오류");
      return false;
    }
  },
  deleteBookmark: async (reviewId: number): Promise<boolean> => {
    try {
      return (
        await JwtAxios.post(`${API_BASE_URL}/review-bookmark/delete-bookmark`, {
          reviewId,
        })
      ).data;
    } catch (error) {
      console.log("북마크 삭제 중 오류");
      return false;
    }
  },
};
