export interface PostData {
  title: string;
  postId: number;
  nickname: string;
  goodNumber: number;
  concept: string;
  region: string;
  images: string[];
}

export interface PostDTO {
  data: PostData;
}

export interface GetListDTO {
  paging: number;
  pagingNumber: number;
  searchType: string;
  keyword: string | null;
  sortBy: string;
  concept: string | null;
  region: string | null;
}
