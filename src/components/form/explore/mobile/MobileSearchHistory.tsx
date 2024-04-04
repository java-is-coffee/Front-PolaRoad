import { RecentDTO } from "components/header/mobile/MobileHeader";
import { useEffect, useState } from "react";
import styles from "./MobileSearchHistory.module.css";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const MobileSearchHistory = () => {
  const [recentData, setRecentData] = useState<RecentDTO[]>([]);

  useEffect(() => {
    const result = localStorage.getItem("recentData") || "[]";
    setRecentData(JSON.parse(result));
  }, []);

  useEffect(() => {
    console.log(recentData);
    localStorage.setItem("recentData", JSON.stringify(recentData));
  }, [recentData]);

  const deleteData = (selectedId: number) => {
    const deletedData = recentData.filter((item) => item.id !== selectedId);
    setRecentData(deletedData);
  };

  return (
    <div>
      <h2>최근 검색어</h2>
      {recentData.map((item) => (
        <div className={styles.data} key={item.id}>
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

export default MobileSearchHistory;
