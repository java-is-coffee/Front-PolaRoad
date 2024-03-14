import StarIcon from "@mui/icons-material/Star";
import styles from "./MainCategory.module.css";
import KebabDiningIcon from "@mui/icons-material/KebabDining";
import ApartmentIcon from "@mui/icons-material/Apartment";
import ForestIcon from "@mui/icons-material/Forest";
import DirectionsWalkIcon from "@mui/icons-material/DirectionsWalk";
import TrainIcon from "@mui/icons-material/Train";
import DirectionsCarFilledIcon from "@mui/icons-material/DirectionsCarFilled";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import TuneIcon from "@mui/icons-material/Tune";
import { useModal } from "../../hooks/modal/ModalProvider";
import ModalOption from "../../enum/modalOptionTypes";
// import { useSelector } from "react-redux";
// import { RootState } from "../../redux/store/store";
// import { useState } from "react";
// import CategoryType from "../../enum/categoryOptionType";

const MainCategory = () => {
  //   const [setCategory, setSetCategory] = useState(CategoryType.NULL);

  // const activeCategory = useSelector(
  //   (state: RootState) => state.setCategory.activeCategory
  // );

  const { openModal } = useModal();

  const showFilterModal = () => {
    openModal(ModalOption.SEARCH);
  };

  return (
    <div className={styles.MainCategoryTap}>
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
      <div className={styles.filterButton} onClick={showFilterModal}>
        <TuneIcon sx={{ fontSize: "2rem", marginRight: "0.5rem" }} />
        필터
      </div>
    </div>
  );
};

export default MainCategory;
