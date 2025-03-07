export interface DiaryData {
  diaryId: string;
  title: string;
  region: string;
  areaCode?: string;
  sigunguCode?: string;
  startDate: string | null;
  endDate: string | null;
  tags: string[];
  totalCost: number;
  content: string;
  userId: string;
  isPublic: boolean;
}

export interface EditDiaryData extends DiaryData {
  ownerId: string; // EditDiary에서만 필요한 필드
}

// export type EditDiaryDataTest = DiaryData & { ownerId: string };

export interface DiaryInfo {
  diaryId: string;
  title: string;
  region: string;
  areaCode: string;
  sigunguCode: string;
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
  bookmarkCount: number;
}

export interface MyDiaryProps {
  type: string;
  userId: string;
}
