import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import styles from "./MainPhotoCard.module.css";
import PlaceIcon from "@mui/icons-material/Place";

export interface PhotoData {
  title: string;
  nickname: string;
  goodNumber: number;
  concept: string;
  region: string;
  images: string[];
}

const MainPhotoCard = ({ item }: { item: PhotoData }) => {
  return (
    <div key={item.images[0]}>
      <img
        loading="lazy"
        alt="x"
        src={item.images[0]}
        className={styles.mainPhoto}
      />
      <div className={styles.photoInfo}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",

            fontSize: "1rem",
          }}
        >
          {item.nickname} 님의 여행 일기
          <span>
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
