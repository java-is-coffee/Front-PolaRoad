export interface IWishListDTO {
  wishListId: number;
  name: string;
}

export interface ICHeckWishListDTO {
  wishListId: number;
  name: string;
  postInWishList: false;
}
