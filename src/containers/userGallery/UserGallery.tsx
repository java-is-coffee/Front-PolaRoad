import { useEffect, useState } from "react";
import HistoryOption from "../../enum/historyOptionType";
import UserGalleryHeader from "../../components/header/userGallery/UserGalleryHeader";
import UserPhotoGallery from "../../components/grid/userPhotoGallery/UserPhotoGallery";

import containerStyles from "./UserGallery.module.css";
import { useModal } from "hooks/modal/ModalProvider";
import ModalOption from "enum/modalOptionTypes";
import PostOptionModal from "components/modal/option/PostOptionModal";

interface UserHistoryContainerProps {
  memberId: number;
  postId?: number;
}

function UserHistoryContainer({ memberId }: UserHistoryContainerProps) {
  const { registerModal, closeModal } = useModal();
  const [optionType, setOptionType] = useState<HistoryOption>(
    HistoryOption.POST
  );
  const handleOptionType = (option: HistoryOption) => {
    if (optionType === option) return;
    setOptionType(option);
  };

  useEffect(
    () => {
      registerModal(
        ModalOption.POST_OPTION,
        <PostOptionModal memberId={memberId} />
      );
      return closeModal(ModalOption.POST_OPTION);
    },
    //eslint-disable-next-line
    []
  );

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
