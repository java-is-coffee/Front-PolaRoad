// CardGrid.tsx
import INewCard from "interface/card/INewCard";
import React from "react";

interface CardProps {
  cards: INewCard[];
}

const CardGrid = ({ cards }: CardProps) => {
  const sectionStyle = {
    width: "400px",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(100px, 1fr))",
    gap: "10px",
    marginBottom: "20px",
  };

  const imgStyle = {
    width: "100%",
    height: "auto",
    aspectRatio: "1 / 1",
    borderRadius: "8px",
    boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
  };

  return (
    <section style={sectionStyle}>
      {cards.map((card, index) => (
        <img
          key={index}
          id={`card-${index}`}
          style={imgStyle}
          src={`${process.env.REACT_APP_BUCKET_BASEURL}/${card.imageUrl}`}
          alt={`Card ${index}`}
        />
      ))}
    </section>
  );
};

export default CardGrid;
