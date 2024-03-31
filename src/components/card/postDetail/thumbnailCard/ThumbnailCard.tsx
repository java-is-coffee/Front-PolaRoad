import conceptOptionType from "enum/post/conceptOptionType";
import regionOptionType from "enum/post/regionOptionType";
import useBucket from "hooks/bucket/useBucket";
import { useEffect, useState } from "react";
import cardStyles from "./ThumbnailCard.module.css";
import patchPostGoodToggle from "api/post/patchPostGoodToggle";
import { useParams } from "react-router-dom";

interface ThumbnailCardProps {
  title: string;
  goodNumber: number;
  thumbnailImageURL: string | undefined;
  concept: conceptOptionType;
  region: regionOptionType;
  hashTags: { hashTagId: number; tagName: string }[];
  memberGood: boolean;
}

function ThumbnailCard({
  title,
  goodNumber,
  thumbnailImageURL,
  concept,
  region,
  hashTags,
  memberGood,
}: ThumbnailCardProps) {
  const { postId } = useParams();
  const { getImage } = useBucket();
  const [isActiveHeart, setIsActiveHeart] = useState<boolean>(memberGood);
  const [likeNum, setLikeNum] = useState<number>(goodNumber);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

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

  const handleHeartClick = () => {
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
        <div className={cardStyles.title}>{title}</div>
        <div onClick={() => handleHeartClick()}>
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
      <span className={cardStyles.good}>{`좋아요 ${likeNum}개`}</span>
      <div className={cardStyles.category}>
        <span className={cardStyles.concept}>{concept}</span>
        <span className={cardStyles.region}>{region}</span>
      </div>
      <section className={cardStyles.hashTags}>
        {hashTags.map((hashTag) => (
          <span>{`#${hashTag.tagName}`}</span>
        ))}
      </section>
    </article>
  );
}

export default ThumbnailCard;
