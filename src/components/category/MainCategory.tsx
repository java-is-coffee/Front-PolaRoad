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
import { switchCategory } from "../../redux/reducers/explore/filterReducer";
import { categorySet, GetListDTO } from "interface/explore/ExplorePost";
import { useState } from "react";
import ScrollButtonLeft from "components/button/explore/ScrollButtonLeft";
import ScrollButtonRight from "components/button/explore/ScrollButtonRight";
import { useMediaQuery } from "@mui/material";

const MainCategory = () => {
  const storeCategory = useSelector(
    (state: RootState) => state.filter.activeCategory
  );

  const categoryList = Object.values(CategoryType);

  const { SetItem } = useExploreHooks();

  const { openModal } = useModal();

  const { setPostList } = useExploreHooks();

  const [activeIndex, setActiveIndex] = useState<number>(0);
  const handleNext = () => {
    if (activeIndex !== 1)
      setActiveIndex((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    if (activeIndex !== 0)
      setActiveIndex((prevActiveStep) => prevActiveStep - 1);
  };

  const scrollStyle = {
    transition: "all 400ms",
    transform: `translateX(-${0 + activeIndex * 50}%)`,
    opacity: 1,
  };

  const isSmallScreen = useMediaQuery("(max-width: 950px)");

  const handleClick = (inputData: CategoryType) => {
    const number = categoryList.indexOf(inputData);
    //중복 체크 (중복으로 눌려졌는지)
    const checkDup = inputData === storeCategory;
    const setCategoyList: GetListDTO = {
      paging: 1,
      pagingNumber: 8,
      searchType: "KEYWORD",
      keyword: null,
      sortBy: "RECENT",
      concept: checkDup ? null : categorySet.key[number],
      region: null,
    };
    SetItem(switchCategory(checkDup ? null : inputData));
    setPostList(setCategoyList);
  };

  const iconList = [
    <StarIcon className={styles.categoryIcon} />,
    <KebabDiningIcon className={styles.categoryIcon} />,
    <ApartmentIcon className={styles.categoryIcon} />,
    <ForestIcon className={styles.categoryIcon} />,
    <DirectionsWalkIcon className={styles.categoryIcon} />,
    <TrainIcon className={styles.categoryIcon} />,
    <DirectionsCarFilledIcon className={styles.categoryIcon} />,
    <PhotoCameraIcon className={styles.categoryIcon} />,
  ];

  return (
    <div className={styles.MainCategoryTap}>
      <div className={styles.scrollContainer}>
        {activeIndex !== 0 && isSmallScreen ? (
          <div className={styles.ScrollButtonLeft}>
            <ScrollButtonLeft handleBack={handleBack} />
          </div>
        ) : (
          ""
        )}
        <div className={styles.categoryContainer} style={scrollStyle}>
          {categoryList.map((item, index) => (
            <label
              key={item}
              className={`${styles.categoryLabel}`}
              onClick={() => handleClick(item)}
            >
              <div
                className={`${styles.categoryItem} ${
                  storeCategory === item ? styles.selected : ""
                } `}
              >
                {iconList[index]}
                {item}
              </div>
            </label>
          ))}
        </div>
        {activeIndex !== 1 && isSmallScreen ? (
          <div className={styles.ScrollButtonRight}>
            <ScrollButtonRight handleNext={handleNext} />
          </div>
        ) : (
          ""
        )}
      </div>

      <div
        className={styles.filterButton}
        onClick={() => {
          openModal(ModalOption.SEARCH);
        }}
      >
        <TuneIcon sx={{ fontSize: "2rem", marginRight: "0.5rem" }} />
        필터
      </div>
    </div>
  );
};

export default MainCategory;
