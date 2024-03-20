import { axiosInstance } from "api/token/axiosInstance";

export interface PostData {
  title: string;
  postId: number;
  nickname: string;
  goodNumber: number;
  concept: string;
  region: string;
  images: string[];
}

export interface PostDTO {
  data: PostData;
}

export interface GetListDTO {
  paging: number;
  pagingNumber: number;
  searchType: string;
  keyword: string | null;
  sortBy: string;
  concept: string | null;
  region: string | null;
}

export interface PostList {}

const GetPostList = async (inputData: GetListDTO) => {
  try {
    console.log("게시판 로드 테스트");
    console.log(inputData);

    let postAPI = `/api/post/list?paging=${inputData.paging}&pagingNumber=${inputData.pagingNumber}&searchType=${inputData.searchType}&sortBy=${inputData.sortBy}`;

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

    return response.data.posts;
  } catch (error) {
    return false;
  }
};

export default GetPostList;
