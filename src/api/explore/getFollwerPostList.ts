import { axiosInstance } from "api/token/axiosInstance";
import { GetFollowListDTO } from "interface/explore/ExplorePost";

const getFollwerPostList = async (inputData: GetFollowListDTO) => {
  try {
    console.log("팔로워 로드 테스트");

    let postAPI = `/api/post/following?page=${inputData.paging}&pageSize=${inputData.pagingNumber}`;

    if (inputData.concept !== null) {
      postAPI = postAPI.concat(`&concept=${inputData.concept}`);
    }

    const response = await axiosInstance.get(postAPI);

    console.log(response.data.posts);

    return response.data;
  } catch (error) {
    return null;
  }
};

export default getFollwerPostList;
