import cardStyles from "./UserAlbumCard.module.css";
import useBucket from "hooks/bucket/useBucket";
import { useEffect, useState } from "react";
import { ISingleAlbum } from "interface/album/ISingleAlbum";
import { useModal } from "hooks/modal/ModalProvider";
import ModalOption from "enum/modalOptionTypes";

interface UserAlbumCardProps {
  singleAlbumData?: ISingleAlbum;
}

function UserAlbumCard({ singleAlbumData }: UserAlbumCardProps) {
  const { getImage } = useBucket();
  const { openModal } = useModal();
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

  const handleOpenPreview = () => {
    openModal(ModalOption.AlBUM_PREVIEW, { albumId: singleAlbumData?.albumId });
  };
  return (
    <div className={cardStyles.imgContainer} onClick={handleOpenPreview}>
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
