// CardGrid.tsx
import INewCard from "interface/card/INewCard";
import gridStyles from "./CardGrid.module.css";
import { IoMdCloseCircle } from "react-icons/io";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  removeCardByIndex,
  setThumbnail,
} from "../../../redux/reducers/newPost/newPostReducers";
import { RootState } from "redux/store/store";
interface CardProps {
  cards: INewCard[];
}

const CardGrid = ({ cards }: CardProps) => {
  const selectedThumbnailIndex = useSelector(
    (state: RootState) => state.newPost.postDetail.thumbnailIndex
  );
  const dispatch = useDispatch();
  const handleRemoveCard = (index: number) => {
    dispatch(removeCardByIndex(index));
  };
  const handleSelectThumbnail = (index: number) => {
    dispatch(setThumbnail(index));
  };
  return (
    <section className={gridStyles.section}>
      {cards.map((card, index) => (
        <div key={index} className={gridStyles.card}>
          <div key={index} className={gridStyles.card}>
            <img
              id={`card-${index}`}
              className={`${gridStyles.img} ${
                selectedThumbnailIndex === index ? gridStyles.selected : ""
              }`}
              src={`${process.env.REACT_APP_BUCKET_BASEURL}/${card.image}`}
              alt={`Card ${index}`}
            />
            <div
              onClick={() => handleSelectThumbnail(index)}
              className={`${gridStyles.overlay} ${
                selectedThumbnailIndex === index ? gridStyles.selected : ""
              }`}
            >
              <span className={gridStyles.index}>{index + 1}</span>
              <IoMdCloseCircle
                className={gridStyles.deleteBtn}
                size={"20px"}
                onClick={() => handleRemoveCard(index)}
              />
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default CardGrid;
