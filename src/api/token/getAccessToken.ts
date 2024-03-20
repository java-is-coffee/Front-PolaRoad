import axios from "axios";
import { axiosInstance } from "./axiosInstance";

export interface RefreshData {
  refreshToken: string;
}

export interface RefreshDTO {
  data: RefreshData;
}

const getAccessToken = async (refreshToken: RefreshData) => {
  try {
    const loginAPI = axiosInstance.defaults.baseURL + "/api/member/refresh";

    const refreshTokenDTO: RefreshDTO = {
      data: refreshToken,
    };

    const response = await axios.post(loginAPI, refreshTokenDTO, {
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

export default getAccessToken;
