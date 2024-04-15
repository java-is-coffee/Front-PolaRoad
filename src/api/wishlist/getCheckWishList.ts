import { axiosInstance } from "api/token/axiosInstance";
import { ICHeckWishListDTO } from "interface/wish/IWishList";

const getCheckWishList = async (
  postId: number
): Promise<ICHeckWishListDTO[] | null> => {
  try {
    const API_URI = `/api/wishlist/add-list/${postId}`;
    const response = await axiosInstance.get(API_URI);
    const { status, data } = response;
    if (status === 200) {
      return data as ICHeckWishListDTO[];
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

export default getCheckWishList;
