import axios from "axios";

const BASE_URL =
  "http://ec2-54-180-2-103.ap-northeast-2.compute.amazonaws.com:8080/api/member/login";

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
    const response = await axios.post(BASE_URL, inputData);

    const code = response.status;
    // const result = response.data;

    return code;
  } catch (error) {
    return "error";
  }
};

export default postRegister;
