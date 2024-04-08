import getCardList from "api/card/getCardList";
import NewAlbumCard from "components/card/newAlbum/NewAlbumCard";
import { Card } from "interface/card/ICardListDTO";
import { useEffect, useState } from "react";
import formStyles from "./SelectAlbumCardForm.module.css";

const SelectAlbumCardForm = () => {
  const [myCardList, setMyCardList] = useState<Card[]>([]);
  const [page, setPage] = useState<number>(1);
  const [maxPage, setMaxPage] = useState<number>(0);
  const pageSize = 10;
  useEffect(
    () => {
      const fetchCardList = async () => {
        if (maxPage === page) return;
        const data = await getCardList(page, pageSize);
        console.log(data);
        if (data) {
          setMyCardList(data.cards);
          setMaxPage(data.maxPage);
          if (data.maxPage > page) {
            setPage((prev) => prev + 1);
          }
        }
      };
      fetchCardList();
    },
    //eslint-disable-next-line
    []
  );
  return (
    <div className={formStyles.formContainer}>
      <div className={formStyles.cardGallery}>
        {myCardList.map((card) => (
          <NewAlbumCard
            key={card.cardId}
            cardId={card.cardId}
            location={card.location}
            image={card.image}
          />
        ))}
      </div>
    </div>
  );
};

export default SelectAlbumCardForm;
