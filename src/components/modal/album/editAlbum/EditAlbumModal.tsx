import { useModal } from "hooks/modal/ModalProvider";
import modalStyles from "./EditAlbumModal.module.css";
import ModalOption from "enum/modalOptionTypes";
import { IoMdClose } from "react-icons/io";
import { useState } from "react";
import NewAlbumTextForm from "components/form/album/NewAlbumTextForm";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import SelectAlbumCardForm from "components/form/album/SelectAlbumCardForm";
import { INewAlbumDTO } from "interface/album/INewAlbumDTO";
import postNewAlbum from "api/album/postNewAlbum";
import { toast } from "react-toastify";
import patchEditAlbum from "api/album/patchEditAlbum";

interface EditAlbumModalProps {
  albumId?: number;
  albumData?: INewAlbumDTO;
}

const EditAlbumModal = ({ albumId, albumData }: EditAlbumModalProps) => {
  const { openModal, closeModal } = useModal();
  const [name, setName] = useState<string>(albumData?.name ?? "");
  const [isNameValidated, setIsNameValidated] = useState<boolean>(true);
  const [description, setDescription] = useState<string>(
    albumData?.description ?? ""
  );
  const [isDescriptionValidated, setIsDescriptionValidated] =
    useState<boolean>(true);
  const [cardIdList, setCardIdList] = useState<number[]>(
    albumData?.cardIdList ?? []
  );
  const [formIndex, setFormIndex] = useState<number>(0);
  if (!albumId || !albumData) return null;

  const handleClose = () => {
    openModal(ModalOption.WARNING, { modalType: ModalOption.ALBUM_EDIT });
  };

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setName(newValue);
    setIsNameValidated(checkValidate(newValue));
  };

  const handleChangeDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setDescription(newValue);
    setIsDescriptionValidated(checkValidate(newValue));
  };

  const handleAddCard = (cardId: number) => {
    setCardIdList((prev) => [...prev, cardId]);
  };

  const handleRemoveCard = (cardId: number) => {
    setCardIdList((prev) => prev.filter((id) => id !== cardId));
  };

  const checkValidate = (inputValue: string) => {
    return inputValue !== "";
  };

  const lastValidate = () => {
    if (name === "") {
      toast.error("앨범이름을 작성해주세요");
      setFormIndex(0);
      return false;
    } else if (description === "") {
      toast.error("간단한 설명을 작성해주세요.");
      setFormIndex(0);
      return false;
    } else if (cardIdList.length === 0) {
      toast.error("카드를 1개 이상 선택해주세요");
      setFormIndex(1);
      return false;
    }
    return true;
  };

  const handleUploadEdit = async () => {
    if (!lastValidate()) return;
    const data: INewAlbumDTO = {
      name: name,
      description: description,
      cardIdList: cardIdList,
    };
    const result = await patchEditAlbum(albumId, data);
    if (result) {
      toast.info("수정 완료");
      closeModal(ModalOption.ALBUM_EDIT);
      closeModal(ModalOption.AlBUM_PREVIEW);
    } else {
      toast.info("업로드 도중 오류가 발생했습니다.");
    }
  };

  const albumForms = [
    <NewAlbumTextForm
      name={name}
      description={description}
      handleChangeName={handleChangeName}
      handleChangeDescription={handleChangeDescription}
      isNameValidated={isNameValidated}
      isDescriptionValidated={isDescriptionValidated}
    />,
    <SelectAlbumCardForm
      handleAddCard={handleAddCard}
      handleRemoveCard={handleRemoveCard}
      selectedIds={cardIdList}
    />,
  ];

  const handleFormIndexDecrease = () => {
    setFormIndex((prev) => prev - 1);
  };

  const handleFormIndexIncrease = () => {
    setFormIndex((prev) => prev + 1);
  };

  return (
    <div className={modalStyles.backdrop} onClick={handleClose}>
      <div
        className={modalStyles.modalContent}
        onClick={(e) => e.stopPropagation()}
      >
        <IoMdClose
          size={"24px"}
          className={modalStyles.closeButton}
          onClick={handleClose}
        />
        <h1>앨범 수정</h1>
        {albumForms[formIndex]}
        {formIndex !== 0 && (
          <IoChevronBack
            size={"24px"}
            className={modalStyles.leftButton}
            onClick={handleFormIndexDecrease}
          />
        )}
        {formIndex === 0 ? (
          <IoChevronForward
            size={"24px"}
            className={modalStyles.rightButton}
            onClick={handleFormIndexIncrease}
          />
        ) : (
          <button
            className={modalStyles.submitButton}
            onClick={handleUploadEdit}
          >
            완료
          </button>
        )}
      </div>
    </div>
  );
};

export default EditAlbumModal;
