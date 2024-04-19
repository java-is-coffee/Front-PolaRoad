import pagingStyles from "./CardPaging.module.css";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { IoMdAdd } from "react-icons/io";

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
        <div className={pagingStyles.btn}>
          <ArrowBackIosIcon />
          {curCardIndex === 0 ? "카드 추가하기" : "이전 카드"}
          {curCardIndex === 0 ? <IoMdAdd /> : ""}
        </div>
      </span>
      <div className={pagingStyles.dots} style={{ textAlign: "center" }}>
        {dots}
      </div>
      <span className={pagingStyles.backIcon} onClick={handleCardRight}>
        <div className={pagingStyles.btn}>
          {curCardIndex === totalCardNum - 1 ? "카드 추가하기" : "다음 카드"}
          {curCardIndex === totalCardNum - 1 ? <IoMdAdd /> : ""}
          <ArrowForwardIosIcon />
        </div>
      </span>
    </div>
  );
}

export default CardPaging;
