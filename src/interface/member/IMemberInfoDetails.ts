export interface IMemberInfoDetails {
  memberId: number;
  email: string;
  name: string;
  nickname: string;
  profileImage: string;
  postNumber: number;
  followedNumber: number;
  followingNumber: number;
}

export interface IMemberEditInfoDTO {
  memberId?: number;
  email?: string;
  name?: string;
  nickname?: string;
  profileImage?: string;
}
