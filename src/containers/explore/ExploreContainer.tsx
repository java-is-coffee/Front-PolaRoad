import { useEffect } from "react";
import MainCategory from "../../components/category/MainCategory";
import ExplorePhotoList from "../../components/grid/explorePhotoList/ExplorePhotoList";
import MainPhoto from "../../components/mainPhoto/MainPhoto";
import exploreContainerStyles from "./ExploreContainer.module.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";
import { useMediaQuery } from "@mui/material";
import useStoreValue from "hooks/storeValue/useStoreValue";
import { setSearchText } from "../../redux/reducers/explore/filterReducer";
import MobileSearchForm from "components/form/explore/mobile/MobileSearchForm";
import { setIsMobileSearchFilter } from "../../redux/reducers/explore/exploreMobileSetting";

function ExploreContainer() {
  const [tokens] = useSearchParams();
  const navigate = useNavigate();

  const isSmallScreen = useMediaQuery("(max-width: 767px)");

  // 커스텀 훅

  const { isMobileSearchFilter, setValue } = useStoreValue();

  //oauth를 통해 들어왔을 경우. param에 토큰들이 저장되어 들어옴
  useEffect(() => {
    const accessToken = tokens.get("access_token");
    const refreshToken = tokens.get("refresh_token");
    // 리프레쉬 토큰조차 없을 경우, 다시 발급받아야함.
    const storedRefreshToken = secureLocalStorage.getItem("refreshToken");
    const storedAccessToken = secureLocalStorage.getItem("accessToken");
    if (tokens.get("search")) {
      setValue(setSearchText(tokens.get("search")));
    }
    if (accessToken && refreshToken) {
      return () => {
        secureLocalStorage.setItem("accessToken", accessToken);
        secureLocalStorage.setItem("refreshToken", refreshToken);
        navigate("/explore");
      };
    }

    if (storedRefreshToken === null && storedAccessToken === null) {
      navigate("/login");
    }

    // eslint-disable-next-line
  }, [tokens]);

  //크기가 다시 커졌을 경우, 검색 창이 안보이도록
  useEffect(() => {
    if (isSmallScreen === false) {
      setValue(setIsMobileSearchFilter(false));
    }
    // eslint-disable-next-line
  }, [isSmallScreen]);

  return (
    <div className={isSmallScreen ? exploreContainerStyles.wrapper : ""}>
      {!isSmallScreen ? <MainPhoto /> : ""}
      {!isSmallScreen ? <MainCategory /> : ""}
      {/* 모바일 화면 + 설정 되어있을때.  */}
      {isMobileSearchFilter && isSmallScreen ? (
        <MobileSearchForm />
      ) : (
        <ExplorePhotoList />
      )}
    </div>
  );
}

export default ExploreContainer;
