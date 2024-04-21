import {
  CommentDetails,
  EditComment,
} from "../../interface/comments/ICommentsDTO";
import { axiosInstance } from "api/token/axiosInstance";

const patchEditComment = async (
  editComment: EditComment,
  reviewNumber: number
): Promise<CommentDetails | null> => {
  try {
    const API_URL = `/api/review/edit/${reviewNumber}`;

    const response = await axiosInstance.patch(API_URL, { data: editComment });

    const { status, data } = response;
    if (status === 200) {
      return data as CommentDetails;
    }
    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default patchEditComment;
