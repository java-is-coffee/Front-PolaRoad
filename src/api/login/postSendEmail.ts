import { axiosInstance } from "api/token/axiosInstance";

export interface EmailData {
  email: string;
}

export interface EmailDTO {
  data: EmailData;
}

const postSendEmail = async (inputData: EmailDTO) => {
  try {
    const SendEmailAPI = "/api/member/register/send-certification";

    const response = await axiosInstance.post(SendEmailAPI, inputData);

    const status = response.status;
    if (status === 200) return true;
    else {
      return false;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

export default postSendEmail;
