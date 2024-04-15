import { Card } from "interface/card/ICardListDTO";
import { ISingleAlbum } from "./ISingleAlbum";
import INewCard from "interface/card/INewCard";

export interface IAlbumDetailsDTO {
  albumId: number;
  memberId: number;
  name: string;
  description: string;
  albumCardInfoList: {
    cardInfo: INewCard;
  }[];
  updatedTime: string;
}
