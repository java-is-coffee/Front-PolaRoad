import { axiosInstance } from "api/token/axiosInstance";

const deleteWishList = async (wishListId: number): Promise<boolean> => {
  try {
    const API_URI = `/api/wishlist/delete/${wishListId}`;
    const response = await axiosInstance.delete(API_URI);
    const { status } = response;
    if (status === 200) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
};

export default deleteWishList;
