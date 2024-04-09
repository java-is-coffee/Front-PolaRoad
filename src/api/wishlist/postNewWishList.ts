import { axiosInstance } from "api/token/axiosInstance";

const postNewWishList = async (wishListName: string): Promise<boolean> => {
  try {
    const API_URI = `/api/wishlist/create?wishListName=${wishListName}`;
    const response = await axiosInstance.post(API_URI);
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

export default postNewWishList;
