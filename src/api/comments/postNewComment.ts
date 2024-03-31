import getMemberInfo from "api/member/getMemberInfo";
import {
  ICommentDTO,
  INewComment,
} from "../../interface/comments/ICommentsDTO";
import { axiosInstance } from "api/token/axiosInstance";

const postNewComment = async (
  newComment: INewComment
): Promise<ICommentDTO[] | null> => {
  try {
    const API_URL = `/api/review/write/${newComment.postId}`;

    const memberInfo = await getMemberInfo();

    if (memberInfo?.memberId) {
      newComment.memberId = memberInfo.memberId;
    }

    const response = await axiosInstance.post(API_URL, { data: newComment });

    const { status, data } = response;
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

export default postNewComment;
