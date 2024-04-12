import { useEffect } from "react";
import MainCategory from "../../components/category/MainCategory";
import ExplorePhotoList from "../../components/grid/explorePhotoList/ExplorePhotoList";
import MainPhoto from "../../components/mainPhoto/MainPhoto";
import exploreContainerStyles from "./ExploreContainer.module.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";
import { useMediaQuery } from "@mui/material";
import useStoreValue from "hooks/storeValue/useStoreValue";
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
    if (tokens.get("access_token")) {
      console.log("oauth 테스트");
      console.log("oauth 테스트??왜 실행이");
      const accessToken = tokens.get("access_token");
      const refreshToken = tokens.get("refresh_token");
      // 리프레쉬 토큰조차 없을 경우, 다시 발급받아야함.

      if (accessToken && refreshToken) {
        secureLocalStorage.setItem("accessToken", accessToken);
        secureLocalStorage.setItem("refreshToken", refreshToken);
        navigate("/explore");
      }
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
