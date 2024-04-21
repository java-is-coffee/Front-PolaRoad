import { axiosInstance } from "api/token/axiosInstance";
export interface ResetPasswordData {
  email: string;
  name: string;
}

export interface ResetPasswordDTO {
  data: ResetPasswordData;
}

const postResetPassword = async (inputData: ResetPasswordDTO) => {
  try {
    const API_URL = "/api/member/login/reset-password";

    const response = await axiosInstance.post(API_URL, inputData);

    const code = response.status;

    return code;
  } catch (error) {
    return null;
  }
};

export default postResetPassword;
