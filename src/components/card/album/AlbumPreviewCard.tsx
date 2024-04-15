import useBucket from "hooks/bucket/useBucket";
import { useEffect, useState } from "react";
import cardStyles from "./AlbumPreviewCard.module.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface AlbumPreviewCardProps {
  imgUrl: string;
  location: string;
  contents: string;
}
const AlbumPreviewCard = ({
  imgUrl,
  location,
  contents,
}: AlbumPreviewCardProps) => {
  const { getImage } = useBucket();
  const [img, setImg] = useState<string>("");
  useEffect(
    () => {
      const fetchCardImg = async () => {
        const url = await getImage(imgUrl);
        if (url) setImg(url);
      };
      fetchCardImg();
    },
    //eslint-disable-next-line
    []
  );
  return (
    <div className={cardStyles.cardContainer}>
      <div className={cardStyles.imgWrapper}>
        <img src={img} alt="Album Card" className={cardStyles.img} />
        <div className={cardStyles.overlayContent}>
          <p>{contents}</p>
          <p>{location}</p>
        </div>
      </div>
    </div>
  );
};

export default AlbumPreviewCard;
