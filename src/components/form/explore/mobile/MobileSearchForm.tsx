import { conceptSet } from "interface/explore/ExplorePost";
import styles from "./MobileSearchForm.module.css";
import StarIcon from "@mui/icons-material/Star";
import KebabDiningIcon from "@mui/icons-material/KebabDining";
import ApartmentIcon from "@mui/icons-material/Apartment";
import ForestIcon from "@mui/icons-material/Forest";
import DirectionsWalkIcon from "@mui/icons-material/DirectionsWalk";
import TrainIcon from "@mui/icons-material/Train";
import DirectionsCarFilledIcon from "@mui/icons-material/DirectionsCarFilled";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";

const MobileSearchForm = () => {
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
    <div>
      <div>
        <h1>여행 테마</h1>
        <div className={styles.conceptBox}>
          {conceptSet.values.map((item, index) => (
            <div key={index} className={styles.conceptList}>
              <div>{iconList[index]}</div>
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MobileSearchForm;
