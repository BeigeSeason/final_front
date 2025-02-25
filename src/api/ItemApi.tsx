import axios from "axios";
import { API_BASE_URL } from "../util/Common";

// 필터 파라미터 타입 정의
interface TourSpotFilters {
  keyword?: string;
  page?: number;
  size?: number;
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
  totalElements: number; // 추가된 부분
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
      return response.data; // 반환 데이터에서 content와 totalPages를 가져옵니다.
    } catch (error) {
      console.error("여행지 데이터 조회 오류:", error);
      throw error;
    }
  },
};
