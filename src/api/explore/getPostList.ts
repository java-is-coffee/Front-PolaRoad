import { axiosInstance } from "api/token/axiosInstance";
import CategoryType from "enum/categoryOptionType";
import RegionOptionType from "enum/filter/RegionType";

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
  sortBy: string;
  concept: CategoryType | null;
  region: RegionOptionType | null;
}

export interface PostList {}

const GetPostList = async (inputData: GetListDTO) => {
  try {
    console.log("게시판 로드 테스트");

    const postAPI = `/api/post/list?paging=${inputData.paging}&pagingNumber=${inputData.pagingNumber}&searchType=${inputData.searchType}&sortBy=${inputData.sortBy}`;
    const response = await axiosInstance.get(postAPI);

    console.log(response.data.posts);

    return response.data.posts;
  } catch (error) {
    return false;
  }
};

export default GetPostList;
