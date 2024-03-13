import StarIcon from "@mui/icons-material/Star";
import styles from "./MainCategory.module.css";
import KebabDiningIcon from "@mui/icons-material/KebabDining";
import ApartmentIcon from "@mui/icons-material/Apartment";
import ForestIcon from "@mui/icons-material/Forest";
import DirectionsWalkIcon from "@mui/icons-material/DirectionsWalk";
import TrainIcon from "@mui/icons-material/Train";
import DirectionsCarFilledIcon from "@mui/icons-material/DirectionsCarFilled";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import { useState } from "react";
import CategoryType from "../../enum/categoryOptionType";

const MainCategory = () => {
  //   const [setCategory, setSetCategory] = useState(CategoryType.NULL);

  return (
    <div className={styles.categoryContainer}>
      <label
        id="HOT"
        className={`${styles.categoryLabel}`}
        // onClick={() => setSetCategory(CategoryType.HOT)}
      >
        <div className={styles.categoryItem}>
          <StarIcon className={styles.categoryIcon} />
          인기 게시글
        </div>
      </label>
      <label className={styles.categoryLabel}>
        <div className={styles.categoryItem}>
          <KebabDiningIcon className={styles.categoryIcon} />
          식도락
        </div>
      </label>
      <label className={styles.categoryLabel}>
        <div className={styles.categoryItem}>
          <ApartmentIcon className={styles.categoryIcon} />
          도시 경관
        </div>
      </label>
      <label className={styles.categoryLabel}>
        <div className={styles.categoryItem}>
          <ForestIcon className={styles.categoryIcon} />
          자연
        </div>
      </label>

      <label className={styles.categoryLabel}>
        <div className={styles.categoryItem}>
          <DirectionsWalkIcon className={styles.categoryIcon} />
          도보 여행
        </div>
      </label>
      <label className={styles.categoryLabel}>
        <div className={styles.categoryItem}>
          <TrainIcon className={styles.categoryIcon} />
          기차 여행
        </div>
      </label>
      <label className={styles.categoryLabel}>
        <div className={styles.categoryItem}>
          <DirectionsCarFilledIcon className={styles.categoryIcon} />
          자동차 여행
        </div>
      </label>
      <label className={styles.categoryLabel}>
        <div className={styles.categoryItem}>
          <PhotoCameraIcon className={styles.categoryIcon} />
          포토 스팟
        </div>
      </label>
    </div>
  );
};

export default MainCategory;
