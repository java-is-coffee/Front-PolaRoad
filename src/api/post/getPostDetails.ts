import { axiosInstance } from "api/token/axiosInstance";
import { IPostDTO } from "interface/post/IPostDTO";

const getPostDetails = async (postId: string): Promise<IPostDTO | null> => {
  try {
    const API_URL = `/api/post/content/${postId}`;

    // 여기에서 post 메서드에 URL과 데이터를 별도의 인자로 전달합니다.
    const response = await axiosInstance.get(API_URL);

    const { status, data } = response;
    if (status === 200) {
      console.log("불러오기 성공");
      return data as IPostDTO;
    }
    return null;
  } catch (error) {
    console.log("불러오기 오류 실패했습니다.");
    console.error(error);
    return null;
  }
};

export default getPostDetails;
