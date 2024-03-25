import axios from "axios";

export interface RefreshData {
  refreshToken: string | number | boolean | object | null;
}

export interface RefreshDTO {
  data: RefreshData;
}

const getAccessToken = async (refreshToken: RefreshData) => {
  try {
    const loginAPI =
      "https://k951a463f2f5fa.user-app.krampoline.com/api/member/refresh";

    const refreshTokenDTO: RefreshDTO = {
      data: refreshToken,
    };

    const response = await axios.post(loginAPI, refreshTokenDTO, {
      withCredentials: true,
    });

    const status = response.status;

    if (status === 200) return response.data;
  } catch (error) {
    return error;
  }
};

export default getAccessToken;
