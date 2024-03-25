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
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";
import CategoryType from "../../enum/categoryOptionType";
import useExploreHooks from "../../hooks/explore/useExploreHooks";
import { switchCategory } from "../../redux/reducers/explore/filterReducer";
import { categorySet, GetListDTO } from "interface/explore/ExplorePost";
import {
  setCurPage,
  setEndPoint,
} from "../../redux/reducers/explore/explorePostReducer";

const initPostDTO: GetListDTO = {
  paging: 1,
  pagingNumber: 8,
  searchType: "KEYWORD",
  keyword: null,
  sortBy: "RECENT",
  concept: null,
  region: null,
};

const MainCategory = () => {
  const storeCategory = useSelector(
    (state: RootState) => state.filter.activeCategory
  );

  const categoryList = Object.values(CategoryType);

  const { SetItem } = useExploreHooks();

  const { openModal } = useModal();

  const { setPostList } = useExploreHooks();

  const showFilterModal = () => {
    openModal(ModalOption.SEARCH);
  };

  const dispatch = useDispatch();

  const handleClick = (inputData: CategoryType) => {
    const number = categoryList.indexOf(inputData);
    const setCategoyList: GetListDTO = {
      paging: 1,
      pagingNumber: 8,
      searchType: "KEYWORD",
      keyword: null,
      sortBy: "RECENT",
      concept: categorySet.key[number],
      region: null,
    };

    // if (categoryNumber)
    console.log("메인");
    console.log(setCategoyList);

    //이전 버튼과 같은 값일 경우 다시 원상 복귀 initPostList는 ExplorePhotoList에 있는 초기 값 가져와서 사용

    if (inputData === storeCategory) {
      //카테고리 미선택 상태
      SetItem(switchCategory(null));
      setPostList(initPostDTO);
      dispatch(setCurPage(1));
      dispatch(setEndPoint(false));
    } else {
      SetItem(switchCategory(inputData));
      setPostList(setCategoyList);
      dispatch(setCurPage(1));
      dispatch(setEndPoint(false));
    }
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
      <div className={styles.categoryContainer}>
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
      <div className={styles.filterButton} onClick={showFilterModal}>
        <TuneIcon sx={{ fontSize: "2rem", marginRight: "0.5rem" }} />
        필터
      </div>
    </div>
  );
};

export default MainCategory;
