import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import styles from "./MainPhotoCard.module.css";
import PlaceIcon from "@mui/icons-material/Place";
import { conceptSet, PostData, regionSet } from "interface/explore/ExplorePost";
import { useEffect, useState } from "react";
import CircleIcon from "@mui/icons-material/Circle";
import ScrollButtonLeft from "components/button/explore/ScrollButtonLeft";
import ScrollButtonRight from "components/button/explore/ScrollButtonRight";
import useBucket from "hooks/bucket/useBucket";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "@mui/material";

const MainPhotoCard = ({ item }: { item: PostData }) => {
  const [cardImgs, setCardImgs] = useState<string[]>([]);
  const { getImage } = useBucket();
  const navigate = useNavigate();

  const isSmallScreen = useMediaQuery("(max-width: 767px)");

  useEffect(() => {
    const fetchMemberInfo = async (src: string) => {
      const newImg = await getImage(src);
      if (newImg) {
        setCardImgs((prev) => [...prev, newImg]);
      }
    };

    item.images.forEach((imgSrc: string) => {
      fetchMemberInfo(imgSrc);
    });

    // eslint-disable-next-line
  }, []);

  const [activeImgIndex, setActiveImgIndex] = useState<number>(0);
  const handleNext = () => {
    if (activeImgIndex < item.images.length - 1) {
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

  const goPost = (id: number) => {
    navigate(`/post/${id}`);
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

  useEffect(() => {
    const dragSpaceX = Math.abs(mouseDownClientX - mouseUpClientX);

    if (mouseDownClientX !== 0 && dragSpaceX > 30 && isSmallScreen) {
      if (mouseUpClientX < mouseDownClientX) {
        handleNext();
      } else if (mouseUpClientX > mouseDownClientX) {
        handleBack();
      }
    }
    // eslint-disable-next-line
  }, [mouseUpClientX]);

  return (
    <div key={item.postId} className={styles.container}>
      <div
        className={styles.cardImg}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onTouchEnd={onTouchEnd}
        onTouchStart={onTouchStart}
      >
        <div className={`${styles.carousel}`}>
          {item.images.map((img, index) => (
            <img
              key={item.postId + img + index}
              onClick={() => {
                goPost(item.postId);
              }}
              style={exampleStyle}
              loading="lazy"
              alt="카드 이미지"
              src={cardImgs[index]}
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

        {activeImgIndex === cardImgs.length - 1 ? (
          ""
        ) : (
          <div className={styles.photoButtonRight}>
            <ScrollButtonRight handleNext={handleNext} />
          </div>
        )}

        <div className={styles.index}>
          {item.images.map((img, index) =>
            index === activeImgIndex ? (
              <CircleIcon key={img + item.postId} sx={{ color: "#13c4a3" }} />
            ) : (
              <CircleIcon key={img + item.postId} sx={{ color: "white" }} />
            )
          )}
        </div>
      </div>

      <div
        className={styles.photoInfo}
        onClick={() => {
          goPost(item.postId);
        }}
      >
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
        <div className={styles.bottomBox}>
          <div className={styles.regionText}>
            <PlaceIcon style={{ color: "#13C4A3" }} />
            {regionSet.values[regionSet.key.indexOf(item.region)]}
          </div>
          <div className={styles.conceptText}>
            {conceptSet.values[conceptSet.key.indexOf(item.concept)]}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPhotoCard;
