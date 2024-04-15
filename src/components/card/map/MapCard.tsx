import cardStyles from "./MapCard.module.css";
import useBucket from "hooks/bucket/useBucket";
import { IMapCard } from "interface/map/IMapCard";
import { useEffect, useState } from "react";

interface MapCardProps {
  card: IMapCard;
}

const MapCard = ({ card }: MapCardProps) => {
  const { getImage } = useBucket();
  const [cardImg, setCardImg] = useState<string>("");
  useEffect(
    () => {
      const fetchImg = async () => {
        const img = await getImage(card.image);
        if (img) setCardImg(img);
      };
      fetchImg();
    },
    // eslint-disable-next-line
    []
  );

  const openInNewTab = () => {
    const newUrl = `${window.location.origin}/post/${card.postId}`;
    console.log(newUrl);
    window.open(newUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div className={cardStyles.container} onClick={() => openInNewTab()}>
      <div className={cardStyles.imgContainer}>
        <img src={cardImg} alt="카드이미지" />
      </div>
      <span className={cardStyles.location}>{card.location}</span>
      <span className={cardStyles.content}>{card.content}</span>
    </div>
  );
};

export default MapCard;
