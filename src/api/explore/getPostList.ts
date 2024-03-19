import axios from "axios";

export const BASE_URL = "https://k951a463f2f5fa.user-app.krampoline.com";

export interface LoginData {
  email: string;
  password: string;
}

export interface LoginDTO {
  data: LoginData;
}

const getPostList = async (inputData: LoginDTO) => {
  try {
    const loginAPI = BASE_URL + "/api/member/login";

    const response = await axios.post(loginAPI, inputData, {
      withCredentials: true,
    });

    const code = response.status;
    // const result = response.data;
    console.log(response.headers["accessToken"]);

    return code;
  } catch (error) {
    return "error";
  }
};

export default getPostList;
