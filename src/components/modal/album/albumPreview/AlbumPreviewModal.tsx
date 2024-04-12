import { useEffect, useState } from "react";
import modalStyle from "./AlbumPreviewModal.module.css";
import { useModal } from "hooks/modal/ModalProvider";
import ModalOption from "enum/modalOptionTypes";
import getAlbumDetails from "api/album/getAlbumDetails";
import INewCard from "interface/card/INewCard";
import AlbumCardCarousel from "components/carousel/albumCardCarousel/AlbumCardCarousel";
import { IoMdClose } from "react-icons/io";

interface AlbumPreviewModalProps {
  albumId?: number;
}
function formatDateTime(dateTimeString: string): string {
  const dateObj = new Date(dateTimeString);
  const year = dateObj.getFullYear();
  const month = ("0" + (dateObj.getMonth() + 1)).slice(-2);
  const date = ("0" + dateObj.getDate()).slice(-2);
  const hours = ("0" + dateObj.getHours()).slice(-2);
  const minutes = ("0" + dateObj.getMinutes()).slice(-2);
  const seconds = ("0" + dateObj.getSeconds()).slice(-2);

  const formattedDateTime = `${year}-${month}-${date} ${hours}:${minutes}:${seconds}`;

  return formattedDateTime;
}

function AlbumPreviewModal({ albumId }: AlbumPreviewModalProps) {
  const [albumName, setAlbumName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [cardListDetails, setCardListDetails] = useState<INewCard[]>([]);
  const [updatedTime, setUpdatedTime] = useState<string>("");
  const { openModal, closeModal } = useModal();

  useEffect(
    () => {
      if (albumId) {
        const fetchAlbumDetails = async () => {
          const data = await getAlbumDetails(albumId);
          if (data) {
            const cardInfoArray = data.albumCardInfoList.map(
              (item) => item.cardInfo
            );
            setCardListDetails(cardInfoArray);
            setAlbumName(data.name);
            setDescription(data.description);
            setUpdatedTime(data.updatedTime);
          }
        };
        fetchAlbumDetails();
      }
    },
    // eslint-disable-next-line
    []
  );

  const handleCancel = () => {
    closeModal(ModalOption.AlBUM_PREVIEW);
  };

  const handleDelete = () => {
    openModal(ModalOption.AlBUM_DELETE, { albumId: albumId });
  };

  const handleAddCard = () => {};

  const handleEditAlbum = () => {
    const cardIds = cardListDetails
      .filter((card) => card.cardId)
      .map((card) => card.cardId);
    const albumData = {
      name: albumName,
      description: description,
      cardIdList: cardIds,
    };
    openModal(ModalOption.ALBUM_EDIT, {
      albumId: albumId,
      albumData: albumData,
    });
  };

  return cardListDetails ? (
    <div className={modalStyle.backdrop} onClick={handleCancel}>
      <div className={modalStyle.modal} onClick={(e) => e.stopPropagation()}>
        <div className={modalStyle.header}>
          <h2 className={modalStyle.albumName}>{albumName}</h2>
          <div className={modalStyle.albumActionBtn}>
            <button className={modalStyle.addCard} onClick={handleAddCard}>
              카드추가
            </button>
            <button className={modalStyle.editAlbum} onClick={handleEditAlbum}>
              수정
            </button>
            <button className={modalStyle.removeAlbum} onClick={handleDelete}>
              삭제
            </button>
            <IoMdClose
              size={"24px"}
              className={modalStyle.closeButton}
              onClick={handleCancel}
            />
          </div>
        </div>

        <p className={modalStyle.description}>{description}</p>
        <span className={modalStyle.updatedTime}>
          {formatDateTime(updatedTime)}
        </span>
        <AlbumCardCarousel albumCards={cardListDetails} />
      </div>
    </div>
  ) : (
    <div className={modalStyle.error}>정보를 불러올 수 없습니다.</div>
  );
}

export default AlbumPreviewModal;
