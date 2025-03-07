export interface Member {
  id: number;
  userId: string;
  email: string;
  name: string;
  nickname: string;
  imgPath: string;
  regDate: string;
  banned: Boolean;
}
export interface Report {
  id: number;
  reportType: string;
  reporter: Member;
  reported: Member;
  reportEntity: string;
  reason: string;
  createdAt: Date;
  checkedAt: Date;
  state: string;
  reviewContent?: string;
}
