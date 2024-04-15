import containerStyles from "./MapSideContainer.module.css";
import { IMapCard } from "interface/map/IMapCard";
import MapCard from "components/card/map/MapCard";
import { IconButton, InputBase, Paper } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { ChangeEvent } from "react";

interface MapSideContainerProps {
  cards: IMapCard[];
  handleInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleSearch: () => void;
}

const MapSideContainer = ({
  cards,
  handleInputChange,
  handleSearch,
}: MapSideContainerProps) => {
  return (
    <div className={containerStyles.container}>
      <h1>장소</h1>
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
      {cards.length !== 0 ? (
        cards.map((card) => <MapCard key={card.cardId} card={card} />)
      ) : (
        <div className={containerStyles.default}>
          <img src="/logo512.png" alt="로고" width={"150px"} />
          <span>검색결과가 없습니다...</span>
        </div>
      )}
    </div>
  );
};

export default MapSideContainer;
