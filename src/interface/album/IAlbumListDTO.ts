import { ISingleAlbum } from "./ISingleAlbum";

export interface IAlbumListDTO {
  albumList: ISingleAlbum[];
  hasNext: boolean;
}
