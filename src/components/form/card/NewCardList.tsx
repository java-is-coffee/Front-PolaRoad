import { useEffect, useRef, useState } from "react";
import formStyles from "./NewCardList.module.css";
import CardPaging from "components/paging/card/CardPaging";
import CardForm from "./CardForm";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "redux/store/store";
import {
  addCardBack,
  addCardFront,
} from "../../../redux/reducers/newPost/newPostReducers";
import { validateCardDetails } from "utils/card/validateCardDetails";

const NewCardDetails = () => {
  // cardList 관련 리덕스
  const cardList = useSelector(
    (state: RootState) => state.newPost.postDetail.cards
  );
  const dispatch = useDispatch();
  // 인덱스 & 캐러셀 설정
  const [activeIndex, setActiveIndex] = useState(0);
  const cardCarousel = useRef<HTMLDivElement>(null);

  const increaseIndex = () => {
    if (!validateCardDetails(cardList[activeIndex])) return;
    if (activeIndex + 1 === cardList.length) {
      dispatch(addCardBack());
    }
    setActiveIndex((prevIndex) => prevIndex + 1);
  };

  const decreaseIndex = () => {
    if (activeIndex - 1 < 0) {
      dispatch(addCardFront());
    } else {
      setActiveIndex((prevIndex) => prevIndex - 1);
    }
  };

  if (!cardList) {
    dispatch(addCardBack());
  }
  useEffect(() => {
    if (cardList.length - 1 < activeIndex) setActiveIndex(cardList.length - 1);
    //eslint-disable-next-line
  }, [cardList.length]);

  return (
    <div className={formStyles.formWrapper}>
      <div className={formStyles.cardListContainer}>
        <div
          className={formStyles.cardList}
          ref={cardCarousel}
          style={{
            transform: `translate3d(-${0 + activeIndex * 100}%, 0, 0)`,
          }}
        >
          {cardList.map((card, index) => {
            return (
              <CardForm
                key={card.cardId}
                cardIndex={index}
                cardDetails={card}
              />
            );
          })}
        </div>
        <CardPaging
          totalCardNum={cardList.length}
          curCardIndex={activeIndex}
          handleCardLeft={decreaseIndex}
          handleCardRight={increaseIndex}
        />
      </div>
      {/* <CardPaging
        totalCardNum={cardList.length}
        curCardIndex={activeIndex}
        handleCardLeft={decreaseIndex}
        handleCardRight={increaseIndex}
      /> */}
    </div>
  );
};

export default NewCardDetails;
