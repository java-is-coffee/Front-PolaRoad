import MainCategory from "../../components/category/MainCategory";
import ExplorePhotoList from "../../components/grid/explorePhotoList/ExplorePhotoList";
import MainPhoto from "../../components/mainPhoto/MainPhoto";
import exploreContainerStyles from "./ExploreContainer.module.css";

function ExploreContainer() {
  return (
    <div className={exploreContainerStyles.wrapper}>
      <MainPhoto />

      <MainCategory />

      <ExplorePhotoList />
    </div>
  );
}

export default ExploreContainer;
