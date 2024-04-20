import { axiosInstance } from "api/token/axiosInstance";
import { GetFollowListDTO } from "interface/explore/ExplorePost";

const getFollwerPostList = async (inputData: GetFollowListDTO) => {
  try {
    let postAPI = `/api/post/following?page=${inputData.paging}&pageSize=${inputData.pagingNumber}`;

    if (inputData.concept !== null) {
      postAPI = postAPI.concat(`&concept=${inputData.concept}`);
    }

    const response = await axiosInstance.get(postAPI);

    return response.data;
  } catch (error) {
    return null;
  }
};

export default getFollwerPostList;
