// 신고하기
export interface ReportData {
  reportType: "MEMBER" | "DIARY" | "REVIEW";
  reporter: string;
  reported: string;
  reportEntity?: string;
  reason: string;
}

// 댓글
export interface Comment {
  date: Date;
  text: string;
}
export interface Review {
  id: number | null;
  memberId: string;
  rating: number;
  tourSpotId: string | undefined;
  content: string;
}
export interface ReviewReq {
  size?: number;
  page?: number;
  tourSpotId?: string;
  userId?: string;
}
export interface ReviewRes {
  id: number;
  memberId: string;
  nickname: string;
  createdAt: string;
  rating: number;
  content: string;
  tourspotId: string;
  tourspotTitle: string;
}
export interface ReviewPageResponse {
  content: ReviewRes[]; // 리뷰 목록
  pageable: {
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
  };
  last: boolean;
  totalElements: number;
  totalPages: number;
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
export interface RecommendInput {
  GENDER: number;
  AGE_GRP: number;
  TRAVEL_STYL_1: number;
  TRAVEL_STYL_2: number;
  TRAVEL_STYL_3: number;
  TRAVEL_STYL_4: number;
  TRAVEL_STYL_5: number;
  TRAVEL_STYL_6: number;
  TRAVEL_STYL_7: number;
  TRAVEL_STYL_8: number;
  TRAVEL_MOTIVE_1: number;
  TRAVEL_COMPANIONS_NUM: number;
  TRAVEL_MISSION_INT: number;
}
export interface Recommendation {
  destination: string;
  score: number;
}
