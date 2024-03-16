import axios from "axios";

const BASE_URL = "https://k951a463f2f5fa.user-app.krampoline.com";

export interface RegisterData {
  email: string;
  //   certificationNumber: string;
  name: string;
  nickname: string;
  password: string;
}

export interface RegisterDTO {
  data: RegisterData;
}

const postRegister = async (inputData: RegisterDTO) => {
  try {
    const API_URL = BASE_URL + "/api/member/register";

    const response = await axios.post(API_URL, inputData);

    const code = response.status;
    // const result = response.data;

    console.log(response);

    return code;
  } catch (error) {
    return "error";
  }
};

export default postRegister;
