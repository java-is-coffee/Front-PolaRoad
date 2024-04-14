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

const MainPhotoCard = ({ item }: { item: PostData }) => {
  const [cardImgs, setCardImgs] = useState<string[]>([]);
  const { getImage } = useBucket();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMemberInfo = async (src: string) => {
      const newImg = await getImage(src);
      if (newImg) {
        setCardImgs((prev) => [...prev, newImg]);
      }
    };

    item.images.map((imgSrc: string) => {
      fetchMemberInfo(imgSrc);
    });

    // eslint-disable-next-line
  }, []);

  const [activeImgIndex, setActiveImgIndex] = useState<number>(0);
  const handleNext = () => {
    if (activeImgIndex < cardImgs.length - 1) {
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

  console.log(cardImgs);

  return (
    <div key={item.postId} className={styles.container}>
      <div className={styles.cardImg}>
        <div className={`${styles.carousel}`}>
          {cardImgs.map((img, index) => (
            <img
              key={img}
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
          {cardImgs.map((img, index) =>
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
