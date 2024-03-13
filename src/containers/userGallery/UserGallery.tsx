import { useState } from "react";
import HistoryOption from "../../enum/historyOptionType";
import UserGalleryHeader from "../../components/header/userGallery/UserGalleryHeader";
import UserPhotoGallery from "../../components/grid/userPhotoGallery/UserPhotoGallery";

import containerStyles from "./UserGallery.module.css";

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
      <UserGalleryHeader
        option={optionType}
        handleOptionChange={handleOptionType}
      />
      <UserPhotoGallery option={optionType} />
    </div>
  );
}

export default UserHistoryContainer;
