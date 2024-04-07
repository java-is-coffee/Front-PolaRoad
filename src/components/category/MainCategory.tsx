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
import CategoryType from "../../enum/ConceptOptionType";
import { conceptSet } from "interface/explore/ExplorePost";
import { useEffect, useState } from "react";
import ScrollButtonLeft from "components/button/explore/ScrollButtonLeft";
import ScrollButtonRight from "components/button/explore/ScrollButtonRight";
import { useMediaQuery } from "@mui/material";
import { useSearchParams } from "react-router-dom";

const MainCategory = () => {
  const isSmallScreen = useMediaQuery("(max-width: 767px)");
  const [param, setParam] = useSearchParams();
  const { openModal } = useModal();
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

  //스크롤 모바일 환경 & 카테고리 버튼 클릭이 아닌 드래그해서 땅기는 형식
  const [mouseDownClientX, setMouseDownClientX] = useState(0);
  const [mouseUpClientX, setMouseUpClientX] = useState(0);

  const onMouseDown = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    setMouseDownClientX(e.clientX);
  };
  const onMouseUp = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    setMouseUpClientX(e.clientX);
  };

  useEffect(() => {
    const dragSpaceX = Math.abs(mouseDownClientX - mouseUpClientX);

    if (mouseDownClientX !== 0 && dragSpaceX > 100 && isSmallScreen) {
      if (mouseUpClientX < mouseDownClientX) {
        handleNext();
      } else if (mouseUpClientX > mouseDownClientX) {
        handleBack();
      }
    }
    // eslint-disable-next-line
  }, [mouseUpClientX]);

  const [tochedX, setTochedX] = useState(0);

  const onTouchStart = (e: React.TouchEvent) => {
    setTochedX(e.changedTouches[0].pageX);
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    const distanceX = tochedX - e.changedTouches[0].pageX;

    if (distanceX > 30) {
      handleNext();
    } else if (distanceX < -30) {
      handleBack();
    }
  };

  const handleClick = (inputData: CategoryType) => {
    const number = conceptSet.values.indexOf(inputData);
    const savedData = conceptSet.key[number];
    //중복 체크 (중복으로 눌려졌는지)
    const checkDup = savedData === param.get("concept");
    if (!checkDup) {
      param.set("concept", conceptSet.key[number]);
      setParam(param);
    } else {
      param.delete("concept");
      setParam(param);
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
      <div
        className={styles.scrollContainer}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onTouchEnd={onTouchEnd}
        onTouchStart={onTouchStart}
      >
        {activeIndex !== 0 && isSmallScreen ? (
          <div className={styles.ScrollButtonLeft}>
            <ScrollButtonLeft handleBack={handleBack} />
          </div>
        ) : (
          ""
        )}
        <div className={styles.categoryContainer} style={scrollStyle}>
          {conceptSet.values.map((item, index) => (
            <label
              key={item}
              className={`${styles.categoryLabel}`}
              onClick={() => handleClick(item)}
            >
              <div
                className={`${styles.categoryItem} ${
                  param.get("concept") === conceptSet.key[index]
                    ? styles.selected
                    : ""
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
