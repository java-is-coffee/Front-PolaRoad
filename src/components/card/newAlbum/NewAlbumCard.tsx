import useBucket from "hooks/bucket/useBucket";
import { Card } from "interface/card/ICardListDTO";
import { useEffect, useState } from "react";
import cardStyles from "./NewAlbumCard.module.css";

const NewAlbumCard = ({ cardId, location, image }: Card) => {
  const [cardImage, setCardImage] = useState<string>("");
  const { getImage } = useBucket();
  useEffect(
    () => {
      const fetchCardImage = async () => {
        const imgUrl = await getImage(image);
        if (imgUrl) setCardImage(imgUrl);
      };
      fetchCardImage();
    },
    //eslint-disable-next-line
    []
  );
  return (
    <div className={cardStyles.imgContainer}>
      <img src={cardImage ? "" : "/basic/photo.png"} alt="카드 이미지" />
      <span>{location}</span>
    </div>
  );
};

export default NewAlbumCard;
