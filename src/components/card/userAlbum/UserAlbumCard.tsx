import cardStyles from "./UserAlbumCard.module.css";
import useBucket from "hooks/bucket/useBucket";
import { useEffect, useState } from "react";
import { ISingleAlbum } from "interface/album/ISingleAlbum";

interface UserAlbumCardProps {
  singleAlbumData?: ISingleAlbum;
}

function UserAlbumCard({ singleAlbumData }: UserAlbumCardProps) {
  const { getImage } = useBucket();
  const [thumbnailUrl, setThumbnailUrl] = useState<string>("");
  useEffect(() => {
    if (singleAlbumData) {
      const getImgUrl = async () => {
        const url = await getImage(singleAlbumData.thumbnail);
        if (!url) setThumbnailUrl("/basic/photo.png");
        else setThumbnailUrl(url);
      };
      getImgUrl();
    }
    // eslint-disable-next-line
  }, []);
  return (
    <div className={cardStyles.imgContainer}>
      <img
        className={cardStyles.img}
        src={thumbnailUrl}
        alt="userImg"
        id={singleAlbumData?.albumId.toString()}
      />
      <div className={cardStyles.overlay}></div>
      <div className={cardStyles.cardDetails}>{singleAlbumData?.name}</div>
    </div>
  );
}

export default UserAlbumCard;
