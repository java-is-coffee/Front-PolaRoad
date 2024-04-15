import { axiosInstance } from "api/token/axiosInstance";
export interface EmailData {
  email: string;
}

export interface EmailDTO {
  data: EmailData;
}

const EmailCheck = async (inputData: EmailDTO) => {
  try {
    const API_URL = "/api/member/register/email-check";

    const response = await axiosInstance.post(API_URL, inputData);

    return response.data;
  } catch (error) {
    return null;
  }
};

export default EmailCheck;
