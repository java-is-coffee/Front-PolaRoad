import { axiosInstance } from "api/token/axiosInstance";
import { IWishListDTO } from "interface/wish/IWishList";

const getWishList = async (): Promise<IWishListDTO[] | null> => {
  try {
    const API_URI = `/api/wishlist/list`;
    const response = await axiosInstance.get(API_URI);
    const { status, data } = response;
    if (status === 200) {
      return data as IWishListDTO[];
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

export default getWishList;
