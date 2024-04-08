import { axiosInstance } from "api/token/axiosInstance";

interface NewPasswordDTO {
  password: string;
}

const patchResetPassword = async (
  passwordDTO: NewPasswordDTO
): Promise<boolean> => {
  try {
    const API_URI = "/api/member/my/edit/reset-password";

    const response = await axiosInstance.patch(API_URI, { data: passwordDTO });
    const { status } = response;
    if (status === 200) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
};

export default patchResetPassword;
