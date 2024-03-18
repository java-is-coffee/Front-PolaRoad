import axios from "axios";

export const BASE_URL = "https://k951a463f2f5fa.user-app.krampoline.com";

export interface PostData {
  title: string;
  postId: number;
  nickname: string;
  goodNumber: number;
  concept: string;
  region: string;
  image: string[];
}

export interface PostDTO {
  data: PostData;
}

export interface PostList {}

const getPostList = async (inputData: PostDTO) => {
  try {
    const loginAPI = BASE_URL + "/api/post/list";

    const response = await axios.post(loginAPI, inputData, {
      withCredentials: true,
    });

    const code = response.status;
    // const result = response.data;

    return response;
  } catch (error) {
    return "error";
  }
};

export default getPostList;
