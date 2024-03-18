import { useEffect } from "react";
import MainCategory from "../../components/category/MainCategory";
import ExplorePhotoList from "../../components/grid/explorePhotoList/ExplorePhotoList";
import MainPhoto from "../../components/mainPhoto/MainPhoto";
import exploreContainerStyles from "./ExploreContainer.module.css";
import { useNavigate, useSearchParams } from "react-router-dom";

function ExploreContainer() {
  const [test] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = test.get("access_token");
    const refreshToken = test.get("refresh_token");

    if (accessToken && refreshToken) {
      return () => {
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        navigate("/explore");
      };
    } else {
      return () => {};
    }
  }, [navigate, test]);

  return (
    <div className={exploreContainerStyles.wrapper}>
      <MainPhoto />

      <MainCategory />

      <ExplorePhotoList />
    </div>
  );
}

export default ExploreContainer;
