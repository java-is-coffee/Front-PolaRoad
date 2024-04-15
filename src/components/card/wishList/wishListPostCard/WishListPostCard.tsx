import cardStyles from "./WishListPostCard.module.css";
import ModalOption from "enum/modalOptionTypes";
import useBucket from "hooks/bucket/useBucket";
import { useModal } from "hooks/modal/ModalProvider";
import { useEffect, useState } from "react";

interface WishListPostCardProps {
  postId: number;
  thumbnailImg: string;
  title: string;
}

const WishListPostCard = ({
  postId,
  thumbnailImg,
  title,
}: WishListPostCardProps) => {
  const { getImage } = useBucket();
  const { openModal } = useModal();
  const [imgUrl, setImgUrl] = useState<string>("");
  useEffect(
    () => {
      const fetchThumbnailImg = async () => {
        const url = await getImage(thumbnailImg);
        if (url) setImgUrl(url);
      };
      console.log("loading img");
      fetchThumbnailImg();
    },
    // eslint-disable-next-line
    [thumbnailImg]
  );

  const handleOpenPostPreview = () => {
    openModal(ModalOption.POST_PREVIEW, { postId: postId });
  };

  return (
    <div onClick={handleOpenPostPreview}>
      <div className={cardStyles.imgContainer}>
        <img src={imgUrl} alt="썸네일" className={cardStyles.img} />
        <div className={cardStyles.cardDetails}>
          <span>{title}</span>
        </div>
      </div>
    </div>
  );
};

export default WishListPostCard;
