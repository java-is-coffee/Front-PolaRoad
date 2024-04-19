import { axiosInstance } from "api/token/axiosInstance";
import { IOtherMemberInfo } from "interface/member/IOtherMemberInfo";

const getOtherMemberInfo = async (
  memberId: number
): Promise<IOtherMemberInfo | null> => {
  try {
    const API_URI = `/api/member/profile?memberId=${memberId}`;

    const response = await axiosInstance.get(API_URI);
    const { status, data } = response;
    if (status === 200) {
      return data as IOtherMemberInfo;
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
};

export default getOtherMemberInfo;
