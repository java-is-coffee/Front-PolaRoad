import conceptOptionType from "enum/post/conceptOptionType";
import regionOptionType from "enum/post/regionOptionType";
import INewCard from "interface/card/INewCard";
import { IMemberInfo } from "interface/member/IMemberInfo";

export interface IPostDTO {
  title: string;
  memberInfo: IMemberInfo;
  thumbnailIndex: number;
  routePoint: string;
  goodNumber: number;
  concept: conceptOptionType;
  region: regionOptionType;
  cards: INewCard[];
  updatedTime: string;
  postHashtags: { hashTagId: number; tagName: string }[];
  memberGood: boolean;
}
