import { axiosInstance } from "api/token/axiosInstance";
export interface RegisterData {
  email: string;
  name: string;
  nickname: string;
  password: string;
}

export interface RegisterDTO {
  data: RegisterData;
}

const postRegister = async (inputData: RegisterDTO) => {
  try {
    const API_URL = "/api/member/register";

    const response = await axiosInstance.post(API_URL, inputData);

    const code = response.status;

    return code;
  } catch (error) {
    return null;
  }
};

export default postRegister;
