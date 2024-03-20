import getAccessToken, { RefreshData } from "api/token/getAccessToken";
import axios from "axios";
import secureLocalStorage from "react-secure-storage";

export const axiosInstance = axios.create({
  baseURL: "https://k951a463f2f5fa.user-app.krampoline.com",
  withCredentials: true,
});

export const BASE_URL = axiosInstance.defaults.baseURL;

axiosInstance.interceptors.request.use((config) => {
  console.log("헤더 붙여넣기 테스트");
  const token = "Bearer " + secureLocalStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = token;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    console.log("에러테스트");
    console.log(error);

    if (error.response.status === 401) {
      try {
        const storeRefreshToken = secureLocalStorage.getItem("refreshToken");
        if (typeof storeRefreshToken === "string") {
          const refreshTokenData: RefreshData = {
            refreshToken: storeRefreshToken,
          };

          const result = await getAccessToken(refreshTokenData);
          secureLocalStorage.clear();
          secureLocalStorage.setItem("accessToken", result.accessToken);
          secureLocalStorage.setItem("refreshToken", result.accessToken);
        }
      } catch (error) {
        console.log(error);
      }
    }

    return Promise.reject(error);
  }
);
