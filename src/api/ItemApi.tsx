import axios from "axios";
import { API_BASE_URL } from "../util/Common";
import {
  TourSpotApiFilters,
  TourSpotResponse,
  DiaryApiFilters,
  UserDiary,
  DiaryResponse,
  TourSpotDetailDto,
  BookmarkData,
  BookmarkedItem,
} from "../types/ItemTypes";
import { Review, ReviewReq, ReviewPageResponse } from "../types/CommonTypes";
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
  addBookmark: async (data: BookmarkData): Promise<boolean> => {
    console.log("북마크 추가");
    console.log(data);
    try {
      return (
        await JwtAxios.post(
          `${API_BASE_URL}/review-bookmark/add-bookmark?targetId=${data.targetId}&userId=${data.userId}&type=${data.type}`
        )
      ).data;
    } catch (error) {
      console.log("북마크 추가 중 오류");
      return false;
    }
  },
  deleteBookmark: async (data: BookmarkData): Promise<boolean> => {
    try {
      return (
        await JwtAxios.post(
          `${API_BASE_URL}/review-bookmark/delete-bookmark?targetId=${data.targetId}&userId=${data.userId}`
        )
      ).data;
    } catch (error) {
      console.log("북마크 삭제 중 오류");
      return false;
    }
  },
  isBookmarked: async (data: BookmarkData): Promise<boolean> => {
    try {
      return (
        await JwtAxios.get(
          `${API_BASE_URL}/review-bookmark/my-bookmark?targetId=${data.targetId}&userId=${data.userId}`
        )
      ).data;
    } catch (error) {
      console.log("북마크 여부 조회 중 오류");
      return false;
    }
  },
  myBookmarkedDiaries: async (
    params: BookmarkedItem
  ): Promise<DiaryResponse> => {
    try {
      return (
        await JwtAxios.get(
          `${API_BASE_URL}/search/my-bookmarked-diaries?userId=${params.userId}&page=${params.page}&size=${params.size}`
        )
      ).data;
    } catch (error) {
      console.log("내가 북마크한 다이어리 목록 조회 중 오류");
      throw error;
    }
  },
  myBookmarkedTourspots: async (
    params: BookmarkedItem
  ): Promise<TourSpotResponse> => {
    console.log(
      (
        await JwtAxios.get(
          `${API_BASE_URL}/search/my-bookmarked-tourspots?userId=${params.userId}&page=${params.page}&size=${params.size}`
        )
      ).data
    );
    try {
      return (
        await JwtAxios.get(
          `${API_BASE_URL}/search/my-bookmarked-tourspots?userId=${params.userId}&page=${params.page}&size=${params.size}`
        )
      ).data;
    } catch (error) {
      console.log("내가 북마크한 관광지 목록 조회 중 오류");
      throw error;
    }
  },
  // 리뷰 작성
  postReview: async (data: Review) => {
    try {
      return await JwtAxios.post(
        `${API_BASE_URL}/review-bookmark/add-review`,
        data
      );
    } catch (error) {
      console.log("댓글 작성 오류");
      return false;
    }
  },
  // 리뷰 수정
  editReview: async (data: Review) => {
    try {
      return await JwtAxios.post(
        `${API_BASE_URL}/review-bookmark/edit-review`,
        data
      );
    } catch (error) {
      console.log("댓글 수정 오류");
      return false;
    }
  },
  // 리뷰 삭제
  deleteReview: async (id: number) => {
    try {
      return await JwtAxios.post(
        `${API_BASE_URL}/review-bookmark/delete-review-redis`,
        null,
        { params: { reviewId: id } }
      );
    } catch (error) {
      console.log("댓글 삭제 실패");
      return false;
    }
  },
  // 리뷰 리스트 조회
  reviewList: async (page = 0, size = 10, tourSpotId = "1") => {
    try {
      const response = await JwtAxios.get(
        `${API_BASE_URL}/review-bookmark/review-list`,
        {
          params: { page, size, tourSpotId },
        }
      );
      return response.data;
    } catch (error) {
      console.error("댓글 리스트 조회 중 오류 발생:", error);
      throw error;
    }
  },
  // 나의 리뷰 리스트 조회
  myReviewList: async (params: ReviewReq): Promise<ReviewPageResponse> => {
    try {
      const response = await JwtAxios.get(
        `${API_BASE_URL}/review-bookmark/my-review-list`,
        { params }
      );
      return response.data;
    } catch (error) {
      console.log("나의 댓글 리스트 조회 중 오류");
      throw error;
    }
  },
};
