import { axiosInstance } from "api/token/axiosInstance";
import secureLocalStorage from "react-secure-storage";

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

    secureLocalStorage.setItem("accessToken", response.data.accessToken);
    secureLocalStorage.setItem("refreshToken", response.data.refreshToken);
    const status = response.status;
    if (status === 200) return response.status;
    else {
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

export default postLogin;
