import { useState } from "react";
import formStyles from "./NewCardList.module.css";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import CardPaging from "components/paging/card/CardPaging";
import { useIndexChange } from "hooks/modal/newFile/useIndexChange";
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
  const maxIndex = cardList.length - 1;
  const { index, increaseIndex, decreaseIndex, direction } = useIndexChange(
    0,
    maxIndex
  );

  const updateCardList = (newCard: INewCard, cardIndex: number) => {
    setCardList((currentCards) =>
      currentCards.map((card, idx) =>
        idx === cardIndex ? { ...card, ...newCard } : card
      )
    );
  };

  if (!cardList) return null;
  return (
    <div>
      <div className={formStyles.formWrapper}>
        <TransitionGroup component={null}>
          <CSSTransition
            key={index}
            timeout={300}
            classNames={{
              enter:
                direction === "right"
                  ? formStyles.cardTransitionRightEnter
                  : formStyles.cardTransitionLeftEnter,
              enterActive:
                direction === "right"
                  ? formStyles.cardTransitionRightEnterActive
                  : formStyles.cardTransitionLeftEnterActive,
              exit:
                direction === "right"
                  ? formStyles.cardTransitionRightExit
                  : formStyles.cardTransitionLeftExit,
              exitActive:
                direction === "right"
                  ? formStyles.cardTransitionRightExitActive
                  : formStyles.cardTransitionLeftExitActive,
            }}
          >
            <CardForm updateCard={updateCardList} />
          </CSSTransition>
        </TransitionGroup>
        <CardPaging
          totalCardNum={cardList.length}
          curCardIndex={index}
          handleCardLeft={decreaseIndex}
          handleCardRight={increaseIndex}
        />
      </div>
    </div>
  );
};

export default NewCardDetails;
