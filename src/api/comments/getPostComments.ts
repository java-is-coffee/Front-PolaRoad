import { ICommentDTO } from "../../interface/comments/ICommentsDTO";
import { axiosInstance } from "api/token/axiosInstance";

const getPostComments = async (
  postId: string,
  page: number
): Promise<ICommentDTO | null> => {
  try {
    const API_URL = `/api/review/post/${postId}/paging?page=${page}`;

    const response = await axiosInstance.get(API_URL);

    const { status, data } = response;
    if (status === 200) {
      console.log("postDetails fetch success");
      return data as ICommentDTO;
    }
    return null;
  } catch (error) {
    console.log("postDetails fetch fail");
    console.error(error);
    return null;
  }
};

export default getPostComments;
