import conceptOptionType from "enum/post/conceptOptionType";
import regionOptionType from "enum/post/regionOptionType";
import useBucket from "hooks/bucket/useBucket";
import { useEffect, useState } from "react";
import cardStyles from "./ThumbnailCard.module.css";
import patchPostGoodToggle from "api/post/patchPostGoodToggle";
import { MdBookmarkAdd } from "react-icons/md";
import { useModal } from "hooks/modal/ModalProvider";
import ModalOption from "enum/modalOptionTypes";
import secureLocalStorage from "react-secure-storage";
import { toast } from "react-toastify";

interface ThumbnailCardProps {
  memberId: number;
  postUpdatedTime: string;
  postId: number;
  title: string;
  goodNumber: number;
  thumbnailImageURL: string | undefined;
  concept: conceptOptionType;
  region: regionOptionType;
  hashTags: { hashTagId: number; tagName: string }[];
  memberGood: boolean;
}

const formattedDate = (date: string) => {
  const updatedDate = new Date(date);
  return updatedDate.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
};

function ThumbnailCard({
  memberId,
  postUpdatedTime,
  postId,
  title,
  goodNumber,
  thumbnailImageURL,
  concept,
  region,
  hashTags,
  memberGood,
}: ThumbnailCardProps) {
  const { getImage } = useBucket();
  const { openModal } = useModal();
  const [isActiveHeart, setIsActiveHeart] = useState<boolean>(memberGood);
  const [likeNum, setLikeNum] = useState<number>(goodNumber);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const hostMemberId = secureLocalStorage.getItem("member");

  useEffect(() => {
    const fetchImage = async () => {
      if (thumbnailImageURL) {
        const result = await getImage(thumbnailImageURL);
        setImageUrl(result);
      }
    };
    fetchImage();
    //eslint-disable-next-line
  }, [thumbnailImageURL]);

  const handleAddPostWishList = () => {
    console.log("openModal");
    openModal(ModalOption.ADD_TO_WISH, { postId: postId });
  };

  const handleHeartClick = () => {
    if (hostMemberId === memberId) {
      toast.error("본인 게시글은 좋아요 할 수 없습니다.");
      return;
    }
    isActiveHeart
      ? setLikeNum((prev) => prev - 1)
      : setLikeNum((prev) => prev + 1);
    setIsActiveHeart((prev) => !prev);
    if (postId) patchPostGoodToggle(Number(postId));
  };

  return (
    <article className={cardStyles.thumbnailCard}>
      {imageUrl && <img src={imageUrl} alt="썸네일" />}
      <div className={cardStyles.header}>
        <div className={cardStyles.title}>
          <span>{title}</span>
          <span className={cardStyles.updateTime}>
            {formattedDate(postUpdatedTime)}
          </span>
        </div>
        <div className={cardStyles.actionControl}>
          <MdBookmarkAdd
            size={"24px"}
            onClick={handleAddPostWishList}
            className={cardStyles.actionButton}
          />
          <div
            onClick={() => handleHeartClick()}
            className={cardStyles.actionButton}
          >
            {isActiveHeart ? (
              <img
                src={"/icons/like/selected-heart.png"}
                style={{ width: "24px", height: "24px" }}
                alt="active-heart"
              />
            ) : (
              <img
                src={"/icons/like/default-heart.png"}
                style={{ width: "24px", height: "24px" }}
                alt="default-heart"
              />
            )}
          </div>
        </div>
      </div>
      <span className={cardStyles.good}>{`좋아요 ${likeNum}개`}</span>
      <div className={cardStyles.category}>
        <span className={cardStyles.concept}>{concept}</span>
        <span className={cardStyles.region}>{region}</span>
      </div>
      <section className={cardStyles.hashTags}>
        {hashTags.map((hashTag, index) => (
          <span key={index}>{`#${hashTag.tagName}`}</span>
        ))}
      </section>
    </article>
  );
}

export default ThumbnailCard;
