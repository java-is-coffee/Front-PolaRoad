import { conceptSet, regionSet, sortSet } from "interface/explore/ExplorePost";
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
import { Button, IconButton } from "@mui/material";
import { setIsMobileSearchFilter } from "../../../../redux/reducers/explore/exploreMobileSetting";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";

const MobileSearchForm = () => {
  const { setValue } = useStoreValue();

  const [query, setQuery] = useSearchParams();
  const [savedSort, setSavedSort] = useState<string | null>("");
  const [savedConcept, setSavedConcept] = useState<string | null>("");
  const [savedRegion, setSavedRegion] = useState<string | null>("");

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
    //savedData = 쿼리에 등록된 데이터 / number = 해당 데이터와 맞는 번호(key값에 대응하기 위해) / checkData = number와 매칭되는 키값 (FOOD & BUSAN)
    const savedData = query.get(aboutFilter);
    const number =
      aboutFilter === "sort"
        ? sortSet.values.indexOf(inputData)
        : aboutFilter === "region"
        ? regionSet.values.indexOf(inputData)
        : conceptSet.values.indexOf(inputData);
    const checkData =
      aboutFilter === "sort"
        ? sortSet.key[number]
        : aboutFilter === "region"
        ? regionSet.key[number]
        : conceptSet.key[number];

    const state =
      aboutFilter === "sort"
        ? setSavedSort
        : aboutFilter === "region"
        ? setSavedConcept
        : setSavedRegion;
    if (checkData === savedData) {
      query.delete(aboutFilter);
      state(null);
    } else {
      query.set(aboutFilter, checkData);
      state(checkData);
    }
  };

  const handleSubmit = () => {
    setQuery(query);
    setValue(setIsMobileSearchFilter(false));
  };

  return (
    <div>
      <div className={styles.container}>
        <IconButton
          aria-label="delete"
          size="large"
          onClick={() => {
            setValue(setIsMobileSearchFilter(false));
          }}
        >
          <CloseIcon fontSize="inherit" />
        </IconButton>
        <h1>정렬</h1>
        <div className={styles.conceptBox}>
          {sortSet.values.map((item, index) => (
            <div
              key={index}
              className={`${styles.conceptList} ${
                savedSort === sortSet.key[index] ||
                sortSet.key[index] === query.get("sort")
                  ? styles.selected
                  : ""
              }`}
              onClick={() => handleClick(item, "sort")}
            >
              <div>{iconList[index]}</div>
              {item}
            </div>
          ))}
        </div>
        <h1>여행 테마</h1>
        <div className={styles.conceptBox}>
          {conceptSet.values.map((item, index) => (
            <div
              key={index}
              className={`${styles.conceptList} ${
                savedConcept === conceptSet.key[index] ||
                conceptSet.key[index] === query.get("concept")
                  ? styles.selected
                  : ""
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
                savedRegion === regionSet.key[index] ||
                regionSet.key[index] === query.get("region")
                  ? styles.selected
                  : ""
              }`}
              onClick={() => handleClick(item, "region")}
            >
              {item}
            </div>
          ))}
        </div>
        <Button
          variant="contained"
          sx={{
            fontSize: "1.5rem",
            backgroundColor: "#13c4a3",
            ":hover": { backgroundColor: "#13c4a3", fontSize: "1.5rem" },
          }}
          onClick={handleSubmit}
        >
          적용하기
        </Button>
      </div>
    </div>
  );
};

export default MobileSearchForm;
