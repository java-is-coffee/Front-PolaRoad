import INewCard from "interface/card/INewCard";
import cardStyles from "./SingleCardDetails.module.css";
import useBucket from "hooks/bucket/useBucket";
import { useEffect, useState } from "react";

interface SingleCardDetailsProps {
  cardDetails: INewCard;
}

function SingleCardDetails({ cardDetails }: SingleCardDetailsProps) {
  const { getImage } = useBucket();
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchImage = async () => {
      if (cardDetails.image) {
        const result = await getImage(cardDetails.image);
        setImageUrl(result);
      }
    };
    fetchImage();
    //eslint-disable-next-line
  }, []);
  return imageUrl ? (
    <article className={cardStyles.cardWrapper}>
      {imageUrl && (
        <img
          src={imageUrl}
          alt={`card-${cardDetails.cardId}`}
          width="100%"
          height="100%"
        />
      )}
      <div className={cardStyles.location}>{cardDetails.location}</div>
      <blockquote className={cardStyles.content}>
        <div>{cardDetails.content}</div>
      </blockquote>
    </article>
  ) : (
    <div></div>
  );
}

export default SingleCardDetails;
