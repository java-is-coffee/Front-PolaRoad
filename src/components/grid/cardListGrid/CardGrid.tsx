// CardGrid.tsx
import INewCard from "interface/card/INewCard";
import gridStyles from "./CardGrid.module.css";
import { IoMdCloseCircle } from "react-icons/io";
import React from "react";
import { useDispatch } from "react-redux";
import { removeCardByIndex } from "../../../redux/reducers/newPost/newPostReducers";
interface CardProps {
  cards: INewCard[];
}

const CardGrid = ({ cards }: CardProps) => {
  const dispatch = useDispatch();
  const handleRemoveCard = (index: number) => {
    dispatch(removeCardByIndex(index));
  };
  return (
    <section className={gridStyles.section}>
      {cards.map((card, index) => (
        <div key={index} className={gridStyles.card}>
          <span className={gridStyles.index}>{index + 1}</span>
          <IoMdCloseCircle
            className={gridStyles.deleteBtn}
            size={"20px"}
            onClick={() => handleRemoveCard(index)}
          />
          <img
            id={`card-${index}`}
            className={gridStyles.img}
            src={`${process.env.REACT_APP_BUCKET_BASEURL}/${card.image}`}
            alt={`Card ${index}`}
          />
        </div>
      ))}
    </section>
  );
};

export default CardGrid;
