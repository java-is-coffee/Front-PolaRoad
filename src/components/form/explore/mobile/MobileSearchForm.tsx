import { conceptSet, regionSet } from "interface/explore/ExplorePost";
import styles from "./MobileSearchForm.module.css";
import StarIcon from "@mui/icons-material/Star";
import KebabDiningIcon from "@mui/icons-material/KebabDining";
import ApartmentIcon from "@mui/icons-material/Apartment";
import ForestIcon from "@mui/icons-material/Forest";
import DirectionsWalkIcon from "@mui/icons-material/DirectionsWalk";
import TrainIcon from "@mui/icons-material/Train";
import DirectionsCarFilledIcon from "@mui/icons-material/DirectionsCarFilled";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import useStoreValue from "hooks/storeValue/useStoreValue";
import CloseIcon from "@mui/icons-material/Close";
import useExploreHooks from "hooks/explore/useExploreHooks";
import {
  switchConcept,
  switchRegion,
  switchSort,
} from "../../../../redux/reducers/explore/filterReducer";
import { IconButton } from "@mui/material";
import { setIsMobileSearchFilter } from "../../../../redux/reducers/explore/exploreMobileSetting";

const MobileSearchForm = () => {
  const { storeSort, storeConcept, storeRegion, setValue } = useStoreValue();
  const { SetItem } = useExploreHooks();

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

  const handleClick = (inputData: any, aboutFilter: string) => {
    if (aboutFilter === "정렬") {
      if (inputData === storeSort) {
        SetItem(switchSort(null));
      } else {
        SetItem(switchSort(inputData));
      }
    }
    if (aboutFilter === "concept") {
      if (inputData === storeConcept) {
        SetItem(switchConcept(null));
      } else {
        SetItem(switchConcept(inputData));
      }
    }
    if (aboutFilter === "region") {
      if (inputData === storeRegion) {
        SetItem(switchRegion(null));
      } else {
        SetItem(switchRegion(inputData));
      }
    }
  };

  return (
    <div>
      <div>
        <IconButton
          aria-label="delete"
          size="large"
          onClick={() => {
            setValue(setIsMobileSearchFilter(false));
          }}
        >
          <CloseIcon fontSize="inherit" />
        </IconButton>
        <h1>여행 테마</h1>
        <div className={styles.conceptBox}>
          {conceptSet.values.map((item, index) => (
            <div
              key={index}
              className={`${styles.conceptList} ${
                storeConcept === item ? styles.selected : ""
              }`}
              onClick={() => handleClick(item, "concept")}
            >
              <div>{iconList[index]}</div>
              {item}
            </div>
          ))}
        </div>
        <h1>지역</h1>
        <div className={styles.conceptBox}>
          {regionSet.values.map((item, index) => (
            <div
              key={index}
              className={`${styles.conceptList} ${
                storeRegion === item ? styles.selected : ""
              }`}
              onClick={() => handleClick(item, "region")}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MobileSearchForm;
