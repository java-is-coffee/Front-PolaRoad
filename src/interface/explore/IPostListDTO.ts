import conceptOptionType from "enum/post/conceptOptionType";
import regionOptionType from "enum/post/regionOptionType";

export interface IPostListDTO {
  posts: MapPostData[];
  hasNext: boolean;
}

export interface MapPostData {
  title: string;
  postId: number;
  nickname: string;
  goodNumber: number;
  concept: conceptOptionType;
  region: regionOptionType;
  images: string[];
  updatedTime: string;
}
