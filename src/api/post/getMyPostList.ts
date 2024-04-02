import { axiosInstance } from "api/token/axiosInstance";
import { IMemberEditInfoDTO } from "interface/member/IMemberInfoDetails";
import { ISinglePost } from "interface/post/ISinglePost";

interface PostListDTO {
  posts: ISinglePost[];
  maxPage: number;
}

const getMyPostList = async (
  page: number,
  pageSize: number
): Promise<PostListDTO | null> => {
  try {
    const API_URI = `/api/post/mypost?page=${page}&pageSize=${pageSize}`;
    const response = await axiosInstance.get(API_URI);
    const { status, data } = response;
    if (status === 200) {
      return data as PostListDTO;
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

export default getMyPostList;
