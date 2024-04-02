import { axiosInstance } from "./axiosInstance";

export interface RefreshData {
  refreshToken: string | number | boolean | object | null;
}

export interface RefreshDTO {
  data: RefreshData;
}

const getAccessToken = async (refreshToken: RefreshData) => {
  try {
    const refreshAPI = "/api/member/refresh";

    const refreshTokenDTO: RefreshDTO = {
      data: refreshToken,
    };

    const response = await axiosInstance.post(refreshAPI, refreshTokenDTO);

    const status = response.status;

    if (status === 200) return response.data;
  } catch (error) {
    return error;
  }
};

export default getAccessToken;
