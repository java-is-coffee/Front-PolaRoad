import { useRef, useState } from "react";
import formStyles from "./NewCardList.module.css";
import CardPaging from "components/paging/card/CardPaging";
import INewCard from "interface/card/INewCard";
import CardForm from "./CardForm";

const initCard: INewCard = {
  location: null,
  latitude: null,
  longitude: null,
  image: null,
  previewUrl: undefined,
  content: null,
};

const NewCardDetails = () => {
  const [cardList, setCardList] = useState<INewCard[]>([initCard]);
  const [activeIndex, setActiveIndex] = useState(0);
  const cardCarousel = useRef<HTMLDivElement>(null);

  const updateCardList = (newCard: INewCard, cardIndex: number) => {
    setCardList((currentCards) =>
      currentCards.map((card, idx) =>
        idx === cardIndex ? { ...card, ...newCard } : card
      )
    );
  };

  const increaseIndex = () => {
    if (activeIndex + 1 === cardList.length) {
      setCardList((card) => [...card, initCard]);
    }
    setActiveIndex((prevIndex) => prevIndex + 1);
  };

  const decreaseIndex = () => {
    if (activeIndex - 1 < 0) {
      setCardList((card) => [initCard, ...card]);
    } else {
      setActiveIndex((prevIndex) => prevIndex - 1);
    }
  };

  if (!cardList) return null;

  return (
    <div className={formStyles.formWrapper}>
      <div className={formStyles.cardListContainer}>
        <div
          className={formStyles.cardList}
          ref={cardCarousel}
          style={{
            transform: `translate3d(${activeIndex * -600}px, 0, 0)`,
          }}
        >
          {cardList.map((card, index) => {
            return (
              <CardForm
                key={index}
                cardIndex={index}
                cardDetails={card}
                updateCard={updateCardList}
              />
            );
          })}
        </div>
      </div>
      <CardPaging
        totalCardNum={cardList.length}
        curCardIndex={activeIndex}
        handleCardLeft={decreaseIndex}
        handleCardRight={increaseIndex}
      />
    </div>
  );
};

export default NewCardDetails;
