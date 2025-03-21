// 필터 파라미터 타입 정의
export interface TourSpotApiFilters {
  keyword?: string;
  page?: number;
  size?: number;
  sort?: string;
  areaCode?: string;
  sigunguCode?: string;
  contentTypeId?: string;
}

// API 응답 데이터 타입 정의
export interface TourSpot {
  spotId: string;
  title: string;
  addr: string;
  thumbnail: string;
  avgRating: number;
  reviewCount: number;
  bookmarkCount: number;
  cat1?: string;
  cat2?: string;
  cat3?: string;
}

export interface TourSpotResponse {
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

export interface DiaryApiFilters {
  page?: number;
  size?: number;
  keyword?: string;
  tag?: string;
  sort?: string;
  areaCode?: string;
  sigunguCode?: string;
  minPrice?: number;
  maxPrice?: number;
}

export interface UserDiary {
  page?: number;
  size?: number;
  userId?: string;
}

// 응답 데이터 타입 정의
export interface Diary {
  diaryId: string;
  title: string;
  contentSummary: string;
  thumbnail: string | null;
  writer: string;
  writerImg: string | null;
  createdAt: string;
  startDate: string;
  endDate: string;
  region: string;
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

export interface DiaryResponse {
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
export interface NearSpot {
  spotId: string;
  title: string;
  addr: string | null;
  thumbnail: string;
  reviewCount: number;
  avgRating: number;
  bookmarkCount: number;
}

export interface TourSpotDetailDto {
  contentId: string;
  title: string;
  addr1: string;
  contact: string;
  mapX: number;
  mapY: number;
  images: string[];
  nearSpots: NearSpot[];
  overview: string;
  homepage: string;
  useTime: string;
  parking: string;
  bookmarkCount: number;
}

export interface SearchFilters {
  searchQuery: string;
  sortBy: string;
  currentPage: number;
  pageSize: number;
}

export interface TourSpotFilters {
  areaCode?: string;
  subAreaCode: string;
  topTheme: string;
  middleTheme: string;
  bottomTheme: string;
  category: string;
  searchQuery: string;
  sortBy: string;
  currentPage: number;
  pageSize: number;
  themeList?: string;
}

export interface DiaryFilters {
  areaCode: string;
  subAreaCode: string;
  searchQuery: string;
  sortBy: string;
  currentPage: number;
  pageSize: number;
  minPrice?: number;
  maxPrice?: number;
}

export interface SelectFilters {
  areaCode?: string;
  subAreaCode?: string;
  topTheme?: string;
  middleTheme?: string;
  bottomTheme?: string;
  category?: string;
  themeList?: string;
  searchQuery?: string;
  sortBy?: string;
  minPrice?: number;
  maxPrice?: number;
}

export interface BookmarkData {
  targetId?: string;
  userId: string;
  type?: "DIARY" | "TOURSPOT";
}

export interface BookmarkedItem {
  userId: string;
  page?: number;
  size?: number;
}
