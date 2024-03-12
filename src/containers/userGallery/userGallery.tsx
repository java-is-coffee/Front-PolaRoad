import { useState } from "react";
import HistoryOption from "../../enum/historyOptionType";
import UserHistoryHeader from "../../components/header/userHistory/userHistoryHeader";
import UserPhotoGallery from "../../components/grid/userPhotoGallery/userPhotoGallery";

import containerStyles from "./userGallery.module.css";

function UserHistoryContainer() {
  const [optionType, setOptionType] = useState<HistoryOption>(
    HistoryOption.POST
  );
  const handleOptionType = (option: HistoryOption) => {
    if (optionType === option) return;
    setOptionType(option);
  };
  return (
    <div className={containerStyles.wrapper}>
      <UserHistoryHeader
        option={optionType}
        handleOptionChange={handleOptionType}
      />
      <UserPhotoGallery option={optionType} />
    </div>
  );
}

export default UserHistoryContainer;
