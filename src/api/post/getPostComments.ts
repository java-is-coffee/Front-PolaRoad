import { ICommentDTO } from "./../../interface/comments/ICommentsDTO";
import { axiosInstance } from "api/token/axiosInstance";

const getPostComments = async (
  postId: string
): Promise<ICommentDTO[] | null> => {
  try {
    const API_URL = `/api/review/post/${postId}`;

    const response = await axiosInstance.get(API_URL);

    const { status, data } = response;
    console.log(data);
    if (status === 200) {
      console.log("postDetails fetch success");
      return data as ICommentDTO[];
    }
    return null;
  } catch (error) {
    console.log("postDetails fetch fail");
    console.error(error);
    return null;
  }
};

export default getPostComments;
