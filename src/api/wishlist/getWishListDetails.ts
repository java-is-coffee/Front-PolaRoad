import { axiosInstance } from "api/token/axiosInstance";
import { IWishListDetails } from "interface/wish/IWishListDetails";

const getWishListDetails = async (
  wishListId: number,
  page: number,
  pageSize: number
): Promise<IWishListDetails | null> => {
  try {
    const API_URI = `/api/wishlist/content/${wishListId}?page=${page}&pageSize=${pageSize}`;
    const response = await axiosInstance.get(API_URI);
    const { status, data } = response;
    if (status === 200) {
      return data as IWishListDetails;
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

export default getWishListDetails;
