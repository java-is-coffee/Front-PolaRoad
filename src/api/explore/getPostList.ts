import axios from "axios";
import CategoryType from "enum/categoryOptionType";
import RegionOptionType from "enum/filter/RegionType";
import secureLocalStorage from "react-secure-storage";

export const BASE_URL = "https://k951a463f2f5fa.user-app.krampoline.com";

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

const getPostList = async (inputData: GetListDTO) => {
  const token = "Bearer " + secureLocalStorage.getItem("accessToken");

  try {
    const postAPI = `${BASE_URL}/api/post/list?paging=${inputData.paging}&pagingNumber=${inputData.pagingNumber}&searchType=${inputData.searchType}&sortBy=${inputData.sortBy}`;

    const response = await axios.get(postAPI, {
      headers: {
        Authorization: token,
      },
      withCredentials: true,
    });

    return response.data.posts;
  } catch (error) {
    return "error";
  }
};

export default getPostList;
