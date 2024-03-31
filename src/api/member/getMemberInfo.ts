import { useDispatch } from "react-redux";
import { axiosInstance } from "api/token/axiosInstance";
import { IMemberInfoDetails } from "interface/member/IMemberInfoDetails";

const getMemberInfo = async (): Promise<IMemberInfoDetails | null> => {
  try {
    const API_URI = "/api/member/my";

    const response = await axiosInstance.get(API_URI);
    const { status, data } = response;
    if (status === 200) {
      return data as IMemberInfoDetails;
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
};

export default getMemberInfo;
