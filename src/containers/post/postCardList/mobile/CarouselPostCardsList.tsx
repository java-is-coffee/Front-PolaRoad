import SingleCardDetails from "components/card/postDetail/SingleCardDetails";
import { IPostDTO } from "interface/post/IPostDTO";
import containerStyles from "./CarouselPostCardsList.module.css";
import { useEffect, useRef, useState } from "react";
import ThumbnailCard from "components/card/postDetail/thumbnailCard/ThumbnailCard";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import CardListHeader from "components/header/cardLIst/CardLIstHeader";

interface CarouselPostCardsListProps {
  postDetails: IPostDTO;
  postId: number;
}

function CarouselPostCardsList({
  postDetails,
  postId,
}: CarouselPostCardsListProps) {
  const [curIndex, setCurIndex] = useState<number>(0);
  const [cardWidth, setCardWidth] = useState<number>(0);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const cards = [
    <ThumbnailCard
      key="thumbnail"
      title={postDetails.title}
      goodNumber={postDetails.goodNumber}
      thumbnailImageURL={postDetails.cards[postDetails.thumbnailIndex].image}
      concept={postDetails.concept}
      region={postDetails.region}
      hashTags={postDetails.postHashtags}
      memberGood={postDetails.memberGood}
    />,
    ...postDetails.cards.map((card, index) => (
      <SingleCardDetails key={index} cardDetails={card} />
    )),
  ];

  useEffect(() => {
    const updateCardWidth = () => {
      const wrapperWidth = wrapperRef.current?.offsetWidth ?? 0;
      setCardWidth(wrapperWidth); // 예: 부모 컨테이너 너비에서 100px을 빼서 설정
    };

    updateCardWidth();
    window.addEventListener("resize", updateCardWidth); // 윈도우 크기가 변경될 때마다 카드 너비 업데이트

    return () => {
      window.removeEventListener("resize", updateCardWidth);
    };
  }, []);

  const handleCardRight = () => {
    if (curIndex < cards.length) {
      setCurIndex((prev) => prev + 1);
    }
  };

  const handleCardLeft = () => {
    if (curIndex >= 0) {
      setCurIndex((prev) => prev - 1);
    }
  };

  return (
    <div>
      <CardListHeader memberInfo={postDetails.memberInfo} postId={postId} />
      <section ref={wrapperRef} className={containerStyles.wrapper}>
        {curIndex === 0 ? (
          ""
        ) : (
          <IoIosArrowBack
            size={"24px"}
            className={containerStyles.navButtonPrev}
            onClick={handleCardLeft}
          />
        )}
        <section
          className={containerStyles.cardCarousel}
          style={{
            transform: `translate3d(${curIndex * -cardWidth}px, 0, 0)`,
          }}
        >
          {cards.map((card, index) => (
            <div
              className={containerStyles.singleCard}
              key={index}
              style={{ width: `${cardWidth}px` }}
            >
              {card}
            </div>
          ))}
        </section>
        {curIndex === cards.length - 1 ? (
          ""
        ) : (
          <IoIosArrowForward
            size={"24px"}
            className={containerStyles.navButtonNext}
            onClick={handleCardRight}
          />
        )}
      </section>
    </div>
  );
}

export default CarouselPostCardsList;
