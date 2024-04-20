import { axiosInstance } from "api/token/axiosInstance";
import { toast } from "react-toastify";

const deleteComment = async (commentId: number): Promise<string | null> => {
  try {
    const API_URL = `/api/review/delete/${commentId}`;

    const response = await axiosInstance.delete(API_URL);

    const { status, data } = response;
    if (status === 200) {
      toast.success("댓글 삭제 완료");
      return data as string;
    } else {
      toast.error("댓글 삭제 실패");
    }
    return null;
  } catch (error) {
    console.log("postDetails fetch fail");
    console.error(error);
    return null;
  }
};

export default deleteComment;
