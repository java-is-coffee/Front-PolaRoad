import useBucket from "hooks/bucket/useBucket";
import { useEffect, useState } from "react";
import cardStyles from "./NewAlbumCard.module.css";

interface NewAlbumCardProps {
  cardId: number;
  location: string;
  image: string;
  defaultSelected: boolean;
  onSelected: (cardId: number, isSelected: boolean) => void;
}

const NewAlbumCard = ({
  cardId,
  location,
  image,
  defaultSelected,
  onSelected,
}: NewAlbumCardProps) => {
  const [isSelected, setIsSelected] = useState<boolean>(defaultSelected);
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

  const handleToggleCard = () => {
    onSelected(cardId, !isSelected);
    setIsSelected((prev) => !prev);
  };

  return (
    <div
      className={`${cardStyles.imgContainer} ${
        isSelected ? cardStyles.selectedCard : ""
      }`}
      onClick={handleToggleCard}
    >
      <img
        className={isSelected ? cardStyles.selectedCard : ""}
        src={cardImage ? cardImage : "/basic/photo.png"}
        alt="카드 이미지"
      />
      {isSelected && (
        <div className={cardStyles.cardDetails}>
          <span>{location}</span>
        </div>
      )}
    </div>
  );
};

export default NewAlbumCard;
