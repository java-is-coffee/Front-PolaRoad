import { useModal } from "hooks/modal/ModalProvider";
import modalStyles from "./NewAlbumModal.module.css";
import ModalOption from "enum/modalOptionTypes";
import { IoMdClose } from "react-icons/io";
import { useState } from "react";
import NewAlbumTextForm from "components/form/album/NewAlbumTextForm";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import SelectAlbumCardForm from "components/form/album/SelectAlbumCardForm";

const NewAlbumModal = () => {
  const { openModal } = useModal();
  const handleClose = () => {
    openModal(ModalOption.WARNING, { modalType: ModalOption.ALBUM });
  };
  const [name, setName] = useState<string>("");
  const [isNameValidated, setIsNameValidated] = useState<boolean>(false);
  const [description, setDescription] = useState<string>("");
  const [isDescriptionValidated, setIsDescriptionValidated] =
    useState<boolean>(false);

  const [formIndex, setFormIndex] = useState<number>(0);

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (checkValidate(e.target.value)) setIsNameValidated(true);
    setName(e.target.value);
  };

  const handleChangeDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (checkValidate(e.target.value)) setIsDescriptionValidated(true);
    setDescription(e.target.value);
  };

  const checkValidate = (inputValue: string) => {
    return inputValue !== "";
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
    <SelectAlbumCardForm />,
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
        {formIndex === 0 && (
          <IoChevronForward
            size={"24px"}
            className={modalStyles.rightButton}
            onClick={handleFormIndexIncrease}
          />
        )}
      </div>
    </div>
  );
};

export default NewAlbumModal;
