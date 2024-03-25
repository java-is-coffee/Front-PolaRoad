import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import styles from "./MainPhotoCard.module.css";
import PlaceIcon from "@mui/icons-material/Place";
import { PostData } from "interface/explore/ExplorePost";

// export interface PhotoData {
//   title: string;
//   nickname: string;
//   goodNumber: number;
//   concept: string;
//   region: string;
//   image: string[];
// }

const MainPhotoCard = ({ item }: { item: PostData }) => {
  return (
    <div key={item.postId}>
      <img
        loading="lazy"
        alt="카드 이미지"
        src="한옥.jpg"
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
