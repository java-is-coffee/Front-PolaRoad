import INewCard from "interface/card/INewCard";
import AlbumPreviewCard from "components/card/album/AlbumPreviewCard";
import Slider from "react-slick";
import "../slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ArrowNext } from "../arrow/ArrowNext";
import { ArrowPrev } from "../arrow/ArrowPrev";

interface AlbumCardCarouselProps {
  albumCards: INewCard[];
}

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 5000,
  adaptiveHeight: true,
  nextArrow: <ArrowNext />,
  prevArrow: <ArrowPrev />,
  appendDots: (dots: any) => (
    <div
      style={{
        width: "100%",
        position: "absolute",
        bottom: "24px",
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

const AlbumCardCarousel = ({ albumCards }: AlbumCardCarouselProps) => {
  return (
    <div style={{ boxSizing: "border-box" }}>
      <Slider {...settings}>
        {albumCards.map(
          (card) =>
            card.image &&
            card.content &&
            card.location && (
              <div key={card.cardId}>
                <AlbumPreviewCard
                  imgUrl={card.image}
                  contents={card.content}
                  location={card.location}
                />
              </div>
            )
        )}
      </Slider>
    </div>
  );
};
export default AlbumCardCarousel;
