import pagingStyles from "./CardPaging.module.css";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

interface CardPagingProps {
  totalCardNum: number;
  curCardIndex: number;
  handleCardLeft: () => void;
  handleCardRight: () => void;
}

function CardPaging({
  totalCardNum,
  curCardIndex,
  handleCardLeft,
  handleCardRight,
}: CardPagingProps) {
  const dots = Array.from({ length: totalCardNum }, (_, index) => (
    <span
      key={index}
      style={{
        height: "8px",
        width: "8px",
        margin: "5px 3px",
        backgroundColor: curCardIndex === index ? "#13c4a3" : "grey",
        display: "inline-block",
        borderRadius: "50%",
      }}
    />
  ));

  return (
    <div className={pagingStyles.paging}>
      <span className={pagingStyles.backIcon} onClick={handleCardLeft}>
        <ArrowBackIosIcon className={pagingStyles.btn} />
        뒤로가기
      </span>
      <div className={pagingStyles.dots} style={{ textAlign: "center" }}>
        {dots}
      </div>
      <span className={pagingStyles.backIcon} onClick={handleCardRight}>
        카드 추가하기
        <ArrowForwardIosIcon className={pagingStyles.btn} />
      </span>
    </div>
  );
}

export default CardPaging;
