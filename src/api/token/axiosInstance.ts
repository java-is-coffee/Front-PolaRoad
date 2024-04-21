import getAccessToken, { RefreshData } from "api/token/getAccessToken";
import axios from "axios";
// import useLogin from "hooks/login/useLogin";
// import { useNavigate } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";

export const axiosInstance = axios.create({
  baseURL: "https://k218cb89f724ba.user-app.krampoline.com",
  withCredentials: true,
});

export const BASE_URL = axiosInstance.defaults.baseURL;

axiosInstance.interceptors.request.use(
  (config) => {
    const token = "Bearer " + secureLocalStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = token;
    }

    // console.log(secureLocalStorage.getItem("accessToken"));

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const { config } = error;

    //토큰 오류일때.
    if (error.response.data.message === "유효하지 않은 토큰입니다.") {
      try {
        const storeRefreshToken = secureLocalStorage.getItem("refreshToken");
        if (storeRefreshToken) {
          const refreshTokenData: RefreshData = {
            refreshToken: storeRefreshToken,
          };

          const result = await getAccessToken(refreshTokenData);
          secureLocalStorage.setItem("accessToken", result.accessToken);
          secureLocalStorage.setItem("refreshToken", result.refreshToken);
          return axiosInstance(config);
        }
      } catch (error) {
        console.log("토큰 발급 에러");
      }
    } else {
      console.log("단순 실수");
    }

    return Promise.reject(error);
  }
);
