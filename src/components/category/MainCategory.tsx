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
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";
import CategoryType from "../../enum/categoryOptionType";
import useExploreHooks from "../../hooks/explore/useExploreHooks";
import { switchCategory } from "../../redux/reducers/explore/setCategoryReducer";

const MainCategory = () => {
  const storeCategory = useSelector(
    (state: RootState) => state.setCategory.activeCategory
  );

  const { SetItem } = useExploreHooks();

  const { openModal } = useModal();

  const showFilterModal = () => {
    openModal(ModalOption.SEARCH);
  };

  const handleClick = (inputData: CategoryType) => {
    // SetCategory(inputData);
    if (inputData === storeCategory) {
      SetItem(switchCategory(null));
    } else {
      SetItem(switchCategory(inputData));
    }
  };

  return (
    <div className={styles.MainCategoryTap}>
      <div className={styles.categoryContainer}>
        <label
          id="HOT"
          className={`${styles.categoryLabel}`}
          onClick={() => handleClick(CategoryType.HOT)}
        >
          <div
            className={`${styles.categoryItem} ${
              storeCategory === CategoryType.HOT ? styles.selected : ""
            } `}
          >
            <StarIcon className={styles.categoryIcon} />
            인기 게시글
          </div>
        </label>
        <label
          className={styles.categoryLabel}
          onClick={() => handleClick(CategoryType.FOOD)}
        >
          <div
            className={`${styles.categoryItem} ${
              storeCategory === CategoryType.FOOD ? styles.selected : ""
            } `}
          >
            <KebabDiningIcon className={styles.categoryIcon} />
            식도락
          </div>
        </label>
        <label
          className={styles.categoryLabel}
          onClick={() => handleClick(CategoryType.CITY)}
        >
          <div
            className={`${styles.categoryItem} ${
              storeCategory === CategoryType.CITY ? styles.selected : ""
            } `}
          >
            <ApartmentIcon className={styles.categoryIcon} />
            도시 경관
          </div>
        </label>
        <label
          className={styles.categoryLabel}
          onClick={() => handleClick(CategoryType.FOREST)}
        >
          <div
            className={`${styles.categoryItem} ${
              storeCategory === CategoryType.FOREST ? styles.selected : ""
            } `}
          >
            <ForestIcon className={styles.categoryIcon} />
            자연
          </div>
        </label>

        <label
          className={styles.categoryLabel}
          onClick={() => handleClick(CategoryType.WALK)}
        >
          <div
            className={`${styles.categoryItem} ${
              storeCategory === CategoryType.WALK ? styles.selected : ""
            } `}
          >
            <DirectionsWalkIcon className={styles.categoryIcon} />
            도보 여행
          </div>
        </label>
        <label
          className={styles.categoryLabel}
          onClick={() => handleClick(CategoryType.TRAIN)}
        >
          <div
            className={`${styles.categoryItem} ${
              storeCategory === CategoryType.TRAIN ? styles.selected : ""
            } `}
          >
            <TrainIcon className={styles.categoryIcon} />
            기차 여행
          </div>
        </label>
        <label
          className={styles.categoryLabel}
          onClick={() => handleClick(CategoryType.CAR)}
        >
          <div
            className={`${styles.categoryItem} ${
              storeCategory === CategoryType.CAR ? styles.selected : ""
            } `}
          >
            <DirectionsCarFilledIcon className={styles.categoryIcon} />
            자동차 여행
          </div>
        </label>
        <label
          className={styles.categoryLabel}
          onClick={() => handleClick(CategoryType.PHOTO)}
        >
          <div
            className={`${styles.categoryItem} ${
              storeCategory === CategoryType.PHOTO ? styles.selected : ""
            } `}
          >
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
