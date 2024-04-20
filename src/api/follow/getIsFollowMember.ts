import { axiosInstance } from "api/token/axiosInstance";

const getIsFollowMember = async (memberId: number): Promise<boolean> => {
  try {
    const API_URL = `/api/member/follow/check?memberId=${memberId}`;

    const response = await axiosInstance.get(API_URL);

    return response.data as boolean;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export default getIsFollowMember;
