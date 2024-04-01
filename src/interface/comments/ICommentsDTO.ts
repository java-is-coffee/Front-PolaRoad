export interface INewComment {
  postId: number;
  memberId: number;
  content: string;
  reviewPhotoList: string[];
}

export interface ICommentDTO {
  content: CommentDetails[];
  hasNext: boolean;
}

export interface CommentDetails {
  reviewId: number; // 리뷰 Id
  postId: number; // 포스트 Id
  memberId: number; // 멤버 Id
  profileImage: string; // 프로필 이미지
  nickname: string; // 멤버 닉네임
  content: string; // 내용
  reviewPhotoInfoList: ReviewPhotoInfoDto[]; // 리뷰 사진 정보 리스트
  updatedTime: string; // 업데이트된 시간
}

interface ReviewPhotoInfoDto {
  reviewPhotoId: number; // 리뷰 사진 Id
  reviewPhotoUrl: string; // 리뷰 사진 URL
}
