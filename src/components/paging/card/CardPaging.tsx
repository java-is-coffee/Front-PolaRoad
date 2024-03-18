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
      <ArrowBackIosIcon className={pagingStyles.btn} onClick={handleCardLeft} />
      <div className={pagingStyles.dots} style={{ textAlign: "center" }}>
        {dots}
      </div>
      <ArrowForwardIosIcon
        className={pagingStyles.btn}
        onClick={handleCardRight}
      />
    </div>
  );
}

export default CardPaging;
