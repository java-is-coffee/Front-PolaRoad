import conceptOptionType from "../../enum/post/conceptOptionType";
import regionOptionType from "../../enum/post/regionOptionType";
import INewCard from "../card/INewCard";

interface INewPost {
  title: string | null;
  routePoint: string | null;
  thumbnailIndex: number | null;
  concept: conceptOptionType | null;
  region: regionOptionType | null;
  cards: INewCard[];
  hashtags: string[];
}

export default INewPost;
