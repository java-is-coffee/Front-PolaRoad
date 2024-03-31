import { axiosInstance } from "api/token/axiosInstance";

const patchPostGoodToggle = async (postId: number) => {
  try {
    const API_URL = `/api/post/good/${postId}`;

    // 여기에서 post 메서드에 URL과 데이터를 별도의 인자로 전달합니다.
    const response = await axiosInstance.patch(API_URL);

    const code = response.status;
    if (code === 200) console.log("좋아요 처리 완료");
    return code;
  } catch (error) {
    console.log("post에 실패했습니다.");
    console.error(error);
    return null;
  }
};

export default patchPostGoodToggle;
