import { SingleCommentDetails } from "../../interface/comments/ICommentsDTO";
import { axiosInstance } from "api/token/axiosInstance";

const getSingleCommentInfo = async (
  reviewId: number
): Promise<SingleCommentDetails | null> => {
  try {
    const API_URL = `/api/review/${reviewId}`;

    const response = await axiosInstance.get(API_URL);

    const { status, data } = response;
    if (status === 200) {
      console.log("postDetails fetch success");
      return data as SingleCommentDetails;
    }
    return null;
  } catch (error) {
    console.log("postDetails fetch fail");
    console.error(error);
    return null;
  }
};

export default getSingleCommentInfo;
