// CardGrid.tsx
import INewCard from "interface/card/INewCard";
import gridStyles from "./CardGrid.module.css";
import { IoMdCloseCircle } from "react-icons/io";
import React from "react";

interface CardProps {
  cards: INewCard[];
}

const CardGrid = ({ cards }: CardProps) => {
  return (
    <section className={gridStyles.section}>
      {cards.map((card, index) => (
        <div key={index} className={gridStyles.card}>
          <IoMdCloseCircle className={gridStyles.deleteBtn} size={"20px"} />
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
