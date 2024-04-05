import conceptOptionType from "enum/post/conceptOptionType";
import regionOptionType from "enum/post/regionOptionType";

export interface ISinglePost {
  title: string;
  postId: number;
  nickname: string;
  goodNumber: number;
  concept: conceptOptionType;
  region: regionOptionType;
  images: string[];
}
