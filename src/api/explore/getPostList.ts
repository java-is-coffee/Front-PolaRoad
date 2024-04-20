import { axiosInstance } from "api/token/axiosInstance";
import { GetListDTO } from "interface/explore/ExplorePost";

const GetPostList = async (inputData: GetListDTO) => {
  try {
    let postAPI = `/api/post/list?page=${inputData.paging}&pageSize=${inputData.pagingNumber}&searchType=${inputData.searchType}&sortBy=${inputData.sortBy}`;

    if (inputData.concept !== null) {
      postAPI = postAPI.concat(`&concept=${inputData.concept}`);
    }

    if (inputData.region !== null) {
      postAPI = postAPI.concat(`&region=${inputData.region}`);
    }

    if (inputData.keyword !== null) {
      postAPI = postAPI.concat(`&keyword=${inputData.keyword}`);
    }

    const response = await axiosInstance.get(postAPI);
    return response.data;
  } catch (error) {
    return null;
  }
};

export default GetPostList;
