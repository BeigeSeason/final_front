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
