import getCardList from "api/card/getCardList";
import NewAlbumCard from "components/card/newAlbum/NewAlbumCard";
import { Card } from "interface/card/ICardListDTO";
import { useEffect, useRef, useState } from "react";
import formStyles from "./SelectAlbumCardForm.module.css";

interface SelectAlbumCardFormProps {
  handleAddCard: (cardId: number) => void;
  handleRemoveCard: (cardId: number) => void;
  selectedIds: number[];
}

const SelectAlbumCardForm = ({
  handleAddCard,
  handleRemoveCard,
  selectedIds,
}: SelectAlbumCardFormProps) => {
  const [myCardList, setMyCardList] = useState<Card[]>([]);
  const [page, setPage] = useState<number>(1);
  const [maxPage, setMaxPage] = useState<number>(0);
  const pageSize = 10;
  const scrollRef = useRef<HTMLDivElement>(null);

  // 카드 리스트를 불러오는 함수
  const fetchCardList = async () => {
    if (maxPage !== 0 && page > maxPage) return; // 모든 페이지를 이미 로드했을 경우 중지
    const data = await getCardList(page, pageSize);
    if (data) {
      console.log(data.cards);
      setMyCardList((prevCards) => [...prevCards, ...data.cards]);
      setMaxPage(data.maxPage);
    }
  };

  // 스크롤 이벤트 리스너
  const handleScroll = () => {
    const threshold = 200; // 페이지 하단에서 200px 남았을 때 데이터 로드 시작
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;

    if (scrollTop + clientHeight >= scrollHeight - threshold) {
      setPage((prev) => prev + 1);
    }
  };

  const handleSelectCard = (cardId: number, isSelected: boolean) => {
    isSelected ? handleAddCard(cardId) : handleRemoveCard(cardId);
  };

  useEffect(() => {
    fetchCardList(); // 컴포넌트 마운트 시 데이터 로드
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (page < 1) {
      fetchCardList(); // 컴포넌트 마운트 시 데이터 로드
    }
    //eslint-disable-next-line
  }, [page]);

  useEffect(() => {
    const scrollContainer = scrollRef.current; // 실제 DOM 요소에 접근
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  return (
    <div>
      <h2>카드 선택</h2>
      <div className={formStyles.formContainer}>
        <div className={formStyles.cardGallery} ref={scrollRef}>
          {myCardList.map((card, index) => (
            <NewAlbumCard
              key={index}
              cardId={card.cardId}
              location={card.location}
              image={card.image}
              defaultSelected={selectedIds.includes(card.cardId)}
              onSelected={handleSelectCard}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SelectAlbumCardForm;
