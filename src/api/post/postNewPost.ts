import { axiosInstance } from "api/token/axiosInstance";
import INewPost from "interface/post/INewPost";
import { toast } from "react-toastify";

const postNewPost = async (postDetails: INewPost) => {
  try {
    const API_URL = "/api/post/write";

    // 여기에서 post 메서드에 URL과 데이터를 별도의 인자로 전달합니다.
    const response = await axiosInstance.post(API_URL, { data: postDetails });

    const code = response.status;
    if (code === 200) {
      toast.info("업로드 성공");
    }
    return code;
  } catch (error) {
    console.log("post에 실패했습니다.");
    console.error(error);
    return null;
  }
};

export default postNewPost;
