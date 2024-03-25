import getAccessToken, { RefreshData } from "api/token/getAccessToken";
import axios from "axios";
// import useLogin from "hooks/login/useLogin";
// import { useNavigate } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";

export const axiosInstance = axios.create({
  baseURL: "https://k951a463f2f5fa.user-app.krampoline.com",
  withCredentials: true,
});

export const BASE_URL = axiosInstance.defaults.baseURL;

axiosInstance.interceptors.request.use(
  (config) => {
    const token = "Bearer " + secureLocalStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = token;
    }
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
    console.log("에러테스트");

    const { config } = error;

    //토큰 오류일때.
    if (error.response.data.message === "유효하지 않은 토큰입니다.") {
      try {
        console.log(error);
        const storeRefreshToken = secureLocalStorage.getItem("refreshToken");

        if (storeRefreshToken) {
          const refreshTokenData: RefreshData = {
            refreshToken: storeRefreshToken,
          };
          console.log("토큰 재발급 테스트");

          const result = await getAccessToken(refreshTokenData);
          secureLocalStorage.clear();
          secureLocalStorage.setItem("accessToken", result.accessToken);
          secureLocalStorage.setItem("refreshToken", result.accessToken);
          console.log("토큰 재발급");
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
