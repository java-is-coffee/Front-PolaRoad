import { axiosInstance } from "api/token/axiosInstance";
import { GetListDTO } from "interface/explore/ExplorePost";
import { IPostListDTO } from "interface/explore/IPostListDTO";

const getPostList = async (
  inputData: GetListDTO
): Promise<IPostListDTO | null> => {
  try {
    console.log("게시판 로드 테스트");

    let postAPI = `/api/post/list?page=${inputData.paging}&pageSize=${inputData.pagingNumber}&searchType=${inputData.searchType}&sortBy=${inputData.sortBy}`;

    if (inputData.concept) {
      postAPI = postAPI.concat(`&concept=${inputData.concept}`);
    }

    if (inputData.region) {
      postAPI = postAPI.concat(`&region=${inputData.region}`);
    }

    if (inputData.keyword) {
      postAPI = postAPI.concat(`&keyword=${inputData.keyword}`);
    }

    const response = await axiosInstance.get(postAPI);

    const { status, data } = response;
    if (status === 200) {
      return data as IPostListDTO;
    }
    return null;
  } catch (error) {
    return null;
  }
};

export default getPostList;
