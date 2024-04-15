import { axiosInstance } from "api/token/axiosInstance";

const postAddPostToWishList = async (
  postId: number,
  WishListId: number
): Promise<boolean> => {
  try {
    const API_URI = `/api/wishlist/add/${WishListId}/${postId}`;
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

export default postAddPostToWishList;
