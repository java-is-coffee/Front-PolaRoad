import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import styles from "./MainPhotoCard.module.css";
import PlaceIcon from "@mui/icons-material/Place";
import { PostData } from "interface/explore/ExplorePost";
import { IconButton } from "@mui/material";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { useState } from "react";
import CircleIcon from "@mui/icons-material/Circle";

const testImgs = ["한옥.jpg", "다리.jpg"];

const MainPhotoCard = ({ item }: { item: PostData }) => {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    if (activeStep < testImgs.length - 1)
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    if (activeStep !== 0) setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <div key={item.postId}>
      <div className={styles.cardImg}>
        <img
          loading="lazy"
          alt="카드 이미지"
          src={testImgs[activeStep]}
          className={styles.mainPhoto}
        />
        <div className={styles.photoButtonSet}>
          <IconButton
            aria-label="delete"
            size="large"
            sx={{
              backgroundColor: "white",
              ":hover": { backgroundColor: "white" },
            }}
            onClick={handleBack}
          >
            <KeyboardArrowLeftIcon sx={{ fontSize: "2rem" }} />
          </IconButton>
          <IconButton
            aria-label="delete"
            size="large"
            sx={{
              backgroundColor: "white",
              ":hover": { backgroundColor: "white" },
            }}
            onClick={handleNext}
          >
            <KeyboardArrowRightIcon sx={{ fontSize: "2rem" }} />
          </IconButton>
        </div>

        <div className={styles.index}>
          {testImgs.map((card, index) =>
            index === activeStep ? (
              <CircleIcon key={card + item.postId} sx={{ color: "#13c4a3" }} />
            ) : (
              <CircleIcon key={card + item.postId} sx={{ color: "white" }} />
            )
          )}
        </div>
      </div>

      <div className={styles.photoInfo}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",

            fontSize: "1rem",
          }}
        >
          {item.nickname} 님의 여행 일기
          <span className={styles.goodNumber}>
            <FavoriteBorderIcon style={{ fontSize: "1.2rem" }} />
            {item.goodNumber}
          </span>
        </div>

        <div style={{ fontSize: "1.7rem" }}>{item.title}</div>
        <div>
          <PlaceIcon style={{ color: "#13C4A3" }} />
          {item.region}
        </div>
      </div>
    </div>
  );
};

export default MainPhotoCard;
