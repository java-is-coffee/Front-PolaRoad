import cardStyles from "./WishListThumbnailCard.module.css";
import getWishListDetails from "api/wishlist/getWishListDetails";
import useBucket from "hooks/bucket/useBucket";
import { useEffect, useState } from "react";

interface WishListThumbnailCardProps {
  wishListId: number;
  name: string;
}

const WishListThumbnailCard = ({
  wishListId,
  name,
}: WishListThumbnailCardProps) => {
  const [thumbnailImg, setThumbnailImg] = useState<string>("");
  const { getImage } = useBucket();
  useEffect(
    () => {
      const fetchThumbnail = async () => {
        const data = await getWishListDetails(wishListId, 1, 8);
        if (data) {
          const img = await getImage(data.posts[0].thumbnailImage);
          if (img) setThumbnailImg(img);
        }
      };
      fetchThumbnail();
    },
    // eslint-disable-next-line
    []
  );

  return (
    <div className={cardStyles.cardContainer}>
      <img src={thumbnailImg} alt="썸네일" className={cardStyles.cardImage} />
      <div className={cardStyles.cardContent}>
        <span className={cardStyles.cardTitle}>{name}</span>
      </div>
    </div>
  );
};

export default WishListThumbnailCard;
