import getMemberInfo from "api/member/getMemberInfo";
import {
  CommentDetails,
  INewComment,
} from "../../interface/comments/ICommentsDTO";
import { axiosInstance } from "api/token/axiosInstance";

const postNewComment = async (
  newComment: INewComment
): Promise<CommentDetails | null> => {
  try {
    const API_URL = `/api/review/write/${newComment.postId}`;

    const memberInfo = await getMemberInfo();

    if (memberInfo?.memberId) {
      newComment.memberId = memberInfo.memberId;
    }

    const response = await axiosInstance.post(API_URL, { data: newComment });

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

export default postNewComment;
