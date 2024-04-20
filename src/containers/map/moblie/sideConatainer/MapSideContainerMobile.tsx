import containerStyles from "./MapSideContainerMobile.module.css";
import { IMapCard } from "interface/map/IMapCard";
import MapCard from "components/card/map/MapCard";
import { IconButton, InputBase, Paper } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { ChangeEvent, useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

interface MapSideContainerMobileProps {
  cards: IMapCard[];
  handleInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleSearch: () => void;
}

const MapSideContainerMobile = ({
  cards,
  handleInputChange,
  handleSearch,
}: MapSideContainerMobileProps) => {
  const [isMinimized, setIsMinimized] = useState(false);
  const toggleContainerUP = () => setIsMinimized((prev) => !prev);
  const inlineStyle = {
    top: isMinimized ? "calc(100vh - 140px)" : "calc(100vh - 90%)", // '100%' 컨테이너 높이만큼 올라옴
  };
  return (
    <div className={containerStyles.container} style={inlineStyle}>
      <div className={containerStyles.upButton} onClick={toggleContainerUP}>
        {isMinimized ? (
          <IoIosArrowUp size={"30px"} color="#666666" />
        ) : (
          <IoIosArrowDown size={"30px"} color="#666666" />
        )}
      </div>
      <div className={containerStyles.header}>
        <h1>장소</h1>
      </div>
      <Paper
        component="form"
        sx={{ p: "2px 4px", display: "flex", alignItems: "center" }}
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          handleSearch();
        }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1, fontSize: "1.4rem" }}
          placeholder="Search Maps"
          inputProps={{ "aria-label": "search google maps" }}
          onChange={handleInputChange}
        />
        <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
          <SearchIcon />
        </IconButton>
      </Paper>
      <div className={containerStyles.cardList}>
        {cards.length !== 0 ? (
          cards.map((card) => <MapCard key={card.cardId} card={card} />)
        ) : (
          <div className={containerStyles.default}>
            <img src="/logo512.png" alt="로고" width={"150px"} />
            <span>검색결과가 없습니다...</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default MapSideContainerMobile;
