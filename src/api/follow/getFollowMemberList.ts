import { axiosInstance } from "api/token/axiosInstance";

const getFollowMemberList = async (): Promise<any> => {
  try {
    const API_URL = `/api/member/my/following/list?page=1&pageSize=10`;

    const response = await axiosInstance.get(API_URL);

    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default getFollowMemberList;
