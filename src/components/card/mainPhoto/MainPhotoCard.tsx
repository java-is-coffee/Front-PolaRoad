import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import styles from "./MainPhotoCard.module.css";
import PlaceIcon from "@mui/icons-material/Place";
import { PostData } from "interface/explore/ExplorePost";
import { useState } from "react";
import CircleIcon from "@mui/icons-material/Circle";
import ScrollButtonLeft from "components/button/explore/ScrollButtonLeft";
import ScrollButtonRight from "components/button/explore/ScrollButtonRight";

const testImgs = ["/한옥.jpg", "/다리.jpg"];

const MainPhotoCard = ({ item }: { item: PostData }) => {
  const [activeImgIndex, setActiveImgIndex] = useState<number>(0);
  const handleNext = () => {
    if (activeImgIndex < testImgs.length - 1) {
      setActiveImgIndex((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    if (activeImgIndex !== 0)
      setActiveImgIndex((prevActiveStep) => prevActiveStep - 1);
  };

  const exampleStyle = {
    transition: "all 400ms",
    transform: `translateX(-${0 + activeImgIndex * 100}%)`,
    opacity: 1,
  };

  return (
    <div key={item.postId}>
      <div className={styles.cardImg}>
        <div className={`${styles.carousel}`}>
          {testImgs.map((item) => (
            <img
              key={item}
              style={exampleStyle}
              loading="lazy"
              alt="카드 이미지"
              src={item}
              className={styles.mainPhoto}
            />
          ))}
        </div>

        {activeImgIndex === 0 ? (
          ""
        ) : (
          <div className={styles.photoButtonLeft}>
            <ScrollButtonLeft handleBack={handleBack} />
          </div>
        )}

        {activeImgIndex === testImgs.length - 1 ? (
          ""
        ) : (
          <div className={styles.photoButtonRight}>
            <ScrollButtonRight handleNext={handleNext} />
          </div>
        )}

        <div className={styles.index}>
          {testImgs.map((card, index) =>
            index === activeImgIndex ? (
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
