import axios from "axios";
import { API_BASE_URL } from "../util/Common";

// 필터 파라미터 타입 정의
interface TourSpotFilters {
  keyword?: string;
  page?: number;
  size?: number;
  sort?: string;
  areaCode?: string;
  sigunguCode?: string;
  contentTypeId?: string;
}

// API 응답 데이터 타입 정의
interface TourSpot {
  spotId: string;
  title: string;
  addr: string;
  thumbnail: string;
}

interface TourSpotResponse {
  content: TourSpot[];
  pageable: {
    sort: {
      empty: boolean;
      unsorted: boolean;
      sorted: boolean;
    };
    offset: number;
    pageNumber: number;
    pageSize: number;
    paged: boolean;
    unpaged: boolean;
  };
  last: boolean;
  totalElements: number;
  totalPages: number;
  first: boolean;
  size: number;
  number: number;
  sort: {
    empty: boolean;
    unsorted: boolean;
    sorted: boolean;
  };
  numberOfElements: number;
  empty: boolean;
}

interface DiaryFilters {
  page?: number;
  size?: number;
  keyword?: string;
}

// 응답 데이터 타입 정의
interface Diary {
  diaryId: string;
  title: string;
  contentSummary: string;
  thumbnail: string | null;
  writer: string;
  writerImg: string | null;
  createdAt: string;
}

interface Pageable {
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  offset: number;
  pageSize: number;
  pageNumber: number;
  paged: boolean;
  unpaged: boolean;
}

interface DiaryResponse {
  content: Diary[];
  pageable: Pageable;
  last: boolean;
  totalPages: number;
  totalElements: number;
  first: boolean;
  size: number;
  number: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  numberOfElements: number;
  empty: boolean;
}

interface TourSpotDetailDto {
  contentId: string;
  title: string;
  addr1: string;
  contact: string;
  mapX: number;
  mapY: number;
  images: string[];
  overview: string;
  homepage: string;
  useTime: string;
  parking: string;
}

export const ItemApi = {
  getTourSpotList: async (
    filters: TourSpotFilters = {}
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
  getDiaryList: async (filters: DiaryFilters = {}): Promise<DiaryResponse> => {
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
};
