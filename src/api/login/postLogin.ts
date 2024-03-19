import { axiosInstance } from "api/token/axiosInstance";

export interface LoginData {
  email: string;
  password: string;
}

export interface LoginDTO {
  data: LoginData;
}

const postLogin = async (inputData: LoginDTO) => {
  try {
    const loginAPI = "/api/member/login";

    const response = await axiosInstance.post(loginAPI, inputData, {
      withCredentials: true,
    });

    const status = response.status;

    if (status === 200) return response.data;
    else {
      return null;
    }
  } catch (error) {
    return null;
  }
};

export default postLogin;
