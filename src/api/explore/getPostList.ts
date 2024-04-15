import { axiosInstance } from "api/token/axiosInstance";
import { GetListDTO } from "interface/explore/ExplorePost";

const GetPostList = async (inputData: GetListDTO) => {
  try {
    console.log("게시판 로드 테스트");

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
    console.log(postAPI);

    console.log(response.data.posts);

    return response.data;
  } catch (error) {
    return null;
  }
};

export default GetPostList;
