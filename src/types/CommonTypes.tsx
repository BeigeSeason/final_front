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