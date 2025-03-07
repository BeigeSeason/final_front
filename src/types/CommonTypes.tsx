// 신고하기
export interface ReportData {
  reportType: "MEMBER" | "DIARY" | "REVIEW";
  reporter: string;
  reported: string;
  reportEntity?: string;
  reason: string;
}
