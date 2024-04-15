import { RecentDTO } from "components/header/mobile/MobileHeader";
import { useEffect, useState } from "react";

import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const WebSearchHistory = () => {
  const [recentData, setRecentData] = useState<RecentDTO[]>([]);

  useEffect(() => {
    const result = localStorage.getItem("recentData") || "[]";
    console.log(result);
    setRecentData(JSON.parse(result));
  }, []);

  const deleteData = (selectedId: number) => {
    const deletedData = recentData.filter((item) => item.id !== selectedId);
    setRecentData(deletedData);
  };

  return (
    <div>
      <h2>최근 검색어</h2>
      {recentData.map((item) => (
        <div key={item.id}>
          {item.data}
          <IconButton
            aria-label="delete"
            size="large"
            onClick={() => deleteData(item.id)}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        </div>
      ))}
    </div>
  );
};

export default WebSearchHistory;
