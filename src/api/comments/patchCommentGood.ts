import { axiosInstance } from "api/token/axiosInstance";
const patchCommentGood = async (reviewId: number): Promise<boolean | null> => {
  try {
    const API_URI = `/api/review/good/${reviewId}`;

    const response = await axiosInstance.patch(API_URI);
    const { status, data } = response;

    if (status === 200) {
      return data.memberIsLiked as boolean;
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

export default patchCommentGood;
