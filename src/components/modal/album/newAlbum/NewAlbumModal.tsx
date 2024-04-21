import { useModal } from "hooks/modal/ModalProvider";
import modalStyles from "./NewAlbumModal.module.css";
import ModalOption from "enum/modalOptionTypes";
import { IoMdClose } from "react-icons/io";
import { useState } from "react";
import NewAlbumTextForm from "components/form/album/NewAlbumTextForm";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import SelectAlbumCardForm from "components/form/album/SelectAlbumCardForm";
import { INewAlbumDTO } from "interface/album/INewAlbumDTO";
import postNewAlbum from "api/album/postNewAlbum";
import { toast } from "react-toastify";

const NewAlbumModal = () => {
  const { openModal, closeModal } = useModal();
  const handleClose = () => {
    openModal(ModalOption.WARNING, { modalType: ModalOption.ALBUM });
  };
  const [name, setName] = useState<string>("");
  const [isNameValidated, setIsNameValidated] = useState<boolean>(false);
  const [description, setDescription] = useState<string>("");
  const [isDescriptionValidated, setIsDescriptionValidated] =
    useState<boolean>(false);
  const [cardIdList, setCardIdList] = useState<number[]>([]);

  const [formIndex, setFormIndex] = useState<number>(0);

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

  const handleSubmitNewAlbum = async () => {
    if (!lastValidate()) return;
    const data: INewAlbumDTO = {
      name: name,
      description: description,
      cardIdList: cardIdList,
    };
    const result = await postNewAlbum(data);
    if (result) {
      console.log(result);
      toast.info("업로드 성공");
      closeModal(ModalOption.ALBUM);
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
        <h1>새 앨범</h1>
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
            onClick={handleSubmitNewAlbum}
          >
            업로드
          </button>
        )}
      </div>
    </div>
  );
};

export default NewAlbumModal;
