import conceptOptionType from "enum/post/conceptOptionType";
import regionOptionType from "enum/post/regionOptionType";
import useBucket from "hooks/bucket/useBucket";
import { useEffect, useState } from "react";
import cardStyles from "./ThumbnailCard.module.css";

interface ThumbnailCardProps {
  title: string;
  goodNumber: number;
  thumbnailImageURL: string | undefined;
  concept: conceptOptionType;
  region: regionOptionType;
  hashTags: string[];
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
  const { getImage } = useBucket();
  const [isActiveHeart, setIsActiveHeart] = useState<boolean>(memberGood);
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

  return (
    <article className={cardStyles.thumbnailCard}>
      {imageUrl && <img src={imageUrl} alt="썸네일" />}
      <div className={cardStyles.header}>
        <div className={cardStyles.title}>{title}</div>
        <div onClick={() => setIsActiveHeart((prev) => !prev)}>
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
      <span className={cardStyles.good}>{`좋아요 ${goodNumber}개`}</span>
      <div className={cardStyles.category}>
        <span className={cardStyles.concept}>{concept}</span>
        <span className={cardStyles.region}>{region}</span>
      </div>
      <section className={cardStyles.hashTags}>
        {hashTags.map((hashTag) => (
          <span>{`#${hashTag}`}</span>
        ))}
      </section>
    </article>
  );
}

export default ThumbnailCard;
