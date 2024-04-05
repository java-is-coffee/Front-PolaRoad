import MainCategory from "components/category/MainCategory";
import headerStyle from "./MobileHeader.module.css";
import SearchIcon from "@mui/icons-material/Search";
import TuneIcon from "@mui/icons-material/Tune";
import useStoreValue from "hooks/storeValue/useStoreValue";
import { setIsMobileSearchFilter } from "../../../redux/reducers/explore/exploreMobileSetting";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import MobileSearchHistory from "components/form/explore/mobile/MobileSearchHistory";
import { useSearchParams } from "react-router-dom";

export interface RecentDTO {
  id: number;
  data: string;
}

function MobileHeader() {
  const { setValue } = useStoreValue();
  const [isInput, setIsInput] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [recentData, setRecentData] = useState<RecentDTO[]>([]);

  const [query, setQuery] = useSearchParams();

  useEffect(() => {
    const result = localStorage.getItem("recentData") || "[]";
    setRecentData(JSON.parse(result));
  }, []);

  useEffect(() => {
    localStorage.setItem("recentData", JSON.stringify(recentData));
  }, [recentData]);

  const handleComponent = () => {
    setValue(setIsMobileSearchFilter(true));
  };

  const clearInput = () => {
    setInputValue("");
    setIsInput(false);
  };

  const deleteData = (selectedId: number) => {
    const deletedData = recentData.filter((item) => item.id !== selectedId);
    setRecentData(deletedData);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newData: RecentDTO = {
      id: Date.now(),
      data: inputValue,
    };

    const newList = [newData, ...recentData];

    setRecentData(newList);
    if (newList.length > 5) {
      deleteData(recentData[4].id);
    }

    setIsInput(false);
    query.set("search", inputValue);
    setQuery(query);
  };

  return (
    <div className={headerStyle.header}>
      <form className={headerStyle.searchBox} onSubmit={handleSubmit}>
        <div>
          <IconButton>
            <SearchIcon sx={{ color: "#bbbbbb", fontSize: "2rem" }} />
          </IconButton>
        </div>
        <TextField
          variant="standard"
          sx={{
            width: "80%",
            "& .MuiInputBase-root": {
              fontSize: "1.5rem",
            },
            "& .MuiInputBase-input::placeholder": {
              textAlign: "center", // placeholder를 가운데 정렬
            },
            "& .MuiInput-underline:before": {
              borderBottom: "1px solid transparent", // focus되지 않았을 때 밑줄 숨김
            },
            "& .MuiInput-underline:after": {
              borderBottom: "2px solid #1976d2", // focus되었을 때 밑줄 스타일 설정
            },
            "& .MuiInput-underline:hover:before": {
              borderBottom: "1px solid transparent", // hover 시에도 밑줄 숨김
            },
          }}
          placeholder="Search"
          value={inputValue}
          onFocus={() => setIsInput(true)}
          onChange={(e) => setInputValue(e.target.value)}
          InputProps={{
            endAdornment: isInput && inputValue && (
              <InputAdornment position="end">
                <IconButton onClick={clearInput}>
                  <CloseIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <div onClick={handleComponent}>
          <TuneIcon sx={{ color: "#bbbbbb", fontSize: "2rem" }} />
        </div>
      </form>

      {isInput ? (
        <div>
          <MobileSearchHistory />
        </div>
      ) : (
        <div>
          <MainCategory />
        </div>
      )}
    </div>
  );
}

export default MobileHeader;
