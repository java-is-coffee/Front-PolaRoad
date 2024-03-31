import getMemberInfo from "api/member/getMemberInfo";
import { axiosInstance } from "api/token/axiosInstance";
import { toast } from "react-toastify";

const postFollowMember = async (
  followingMemberId: number
): Promise<boolean> => {
  try {
    const API_URL = `/api/member/my/follow/${followingMemberId}`;

    const response = await axiosInstance.post(API_URL);

    const { status } = response;
    if (status === 200) {
      toast.info("팔로우 완료");
      return true;
    }
    return false;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export default postFollowMember;
