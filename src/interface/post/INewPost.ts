import conceptOptionType from "../../enum/conceptOptionType";
import regionOptionType from "../../enum/regionOptionType";
import INewCard from "../card/INewCard";

interface INewPost {
  title: string | null;
  routePoint: string | null;
  thumbnailIndex: number | null;
  concept: conceptOptionType | null;
  region: regionOptionType | null;
  cards: INewCard[] | null;
  hashtags: string[] | null;
}

export default INewPost;
