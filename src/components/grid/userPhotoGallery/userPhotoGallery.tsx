import HistoryOption from "../../../enum/historyOptionType";
import UserImgCard from "../../card/userPhoto/userPhotoCard";

import gridStyle from "./userPhotoGallery.module.css";

const images = [
  "/basic/photo.png",
  "/basic/photo.png",
  "/basic/photo.png",
  "/basic/photo.png",
  "/basic/photo.png",
  "/basic/photo.png",
  "/basic/photo.png",
  "/basic/photo.png",
  "/basic/photo.png",
  "/basic/photo.png",
  "/basic/photo.png",
  "/basic/photo.png",
  "/basic/photo.png",
  "/basic/photo.png",
  "/basic/photo.png",
  "/basic/photo.png",
  "/basic/photo.png",
  "/basic/photo.png",
  "/basic/photo.png",
  "/basic/photo.png",
  "/basic/photo.png",
  "/basic/photo.png",
  "/basic/photo.png",
  "/basic/photo.png",
  "/basic/photo.png",
  "/basic/photo.png",
  "/basic/photo.png",
  "/basic/photo.png",
  "/basic/photo.png",
  "/basic/photo.png",
  "/basic/photo.png",
];

interface userPhotoGalleryProps {
  option: HistoryOption;
}

function UserPhotoGallery({ option }: userPhotoGalleryProps) {
  return (
    <div className={gridStyle.gridGallery}>
      {images.map((src, index) => (
        <UserImgCard key={index} imgSrc={src} />
      ))}
    </div>
  );
}

export default UserPhotoGallery;
