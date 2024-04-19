import { axiosInstance } from "api/token/axiosInstance";
import { toast } from "react-toastify";

const postFollowMember = async (
  followingMemberId: number,
  type: string
): Promise<boolean> => {
  try {
    const API_URL = `/api/member/my/follow/${followingMemberId}`;

    const response = await axiosInstance.post(API_URL);

    const { status } = response;
    console.log(response.data);
    if (status === 200) {
      type === "팔로우"
        ? toast.info(`${type} 완료`)
        : toast.error(`${type} 완료`);
      return true;
    }
    return false;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export default postFollowMember;
