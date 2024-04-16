import SingleCardDetails from "components/card/postDetail/SingleCardDetails";
import { IPostDTO } from "interface/post/IPostDTO";
import containerStyles from "./PostCardList.module.css";
import ThumbnailCard from "components/card/postDetail/thumbnailCard/ThumbnailCard";
import CardListHeader from "components/header/cardLIst/CardLIstHeader";
import { ArrowNext } from "components/carousel/arrow/ArrowNext";
import { ArrowPrev } from "components/carousel/arrow/ArrowPrev";
import "./slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

interface PostCardListCarouselProps {
  postDetails: IPostDTO;
  postId: number;
}

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: false,
  adaptiveHeight: true,
  nextArrow: <ArrowNext />,
  prevArrow: <ArrowPrev />,
  appendDots: (dots: any) => (
    <div
      style={{
        width: "100%",
        position: "absolute",
        bottom: "100px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <ul> {dots} </ul>
    </div>
  ),
  dotsClass: "dots_custom",
};

const PostCardListCarousel = ({
  postDetails,
  postId,
}: PostCardListCarouselProps) => {
  const cards = [
    <ThumbnailCard
      postId={postId}
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
  return (
    <section className={containerStyles.wrapper}>
      <CardListHeader memberInfo={postDetails.memberInfo} postId={postId} />
      <Slider {...settings}>
        {cards.map((card, index) => (
          <div className={containerStyles.singleCard} key={index}>
            {card}
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default PostCardListCarousel;
