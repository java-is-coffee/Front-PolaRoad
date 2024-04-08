import { useModal } from "hooks/modal/ModalProvider";
import modalStyles from "./NewWishListModal.module.css";
import ModalOption from "enum/modalOptionTypes";
import { IoMdClose } from "react-icons/io";
import { useEffect, useState } from "react";
import UniversalInput from "components/input/UniversalInput";
import getWishList from "api/wishlist/getWishList";
import { IWishListDTO } from "interface/wish/IWishList";
import postNewWishList from "api/wishlist/postNewWishList";
import { FaRegEdit } from "react-icons/fa";
import { toast } from "react-toastify";

const NewWishListModal = () => {
  const { closeModal } = useModal();
  const handleClose = () => {
    closeModal(ModalOption.WISH);
  };
  const [name, setName] = useState<string>("");
  const [memberWishList, setMemberWishList] = useState<IWishListDTO[]>([]);
  const [errorMsg, setErrorMsg] = useState<string>("필수 항목입니다.");
  const [isValidate, setIsValidate] = useState<boolean>(false);

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    checkValidate(e.target.value);
    setName(e.target.value);
  };

  useEffect(() => {
    const fetchMyWishList = async () => {
      const data = await getWishList();
      if (data) setMemberWishList(data);
    };
    fetchMyWishList();
    // eslint-disable-next-line
  }, []);

  const checkValidate = (inputValue: string) => {
    const exists = memberWishList.some((wish) => wish.name === inputValue);
    setErrorMsg(
      exists ? "이미 존재하는 위시리스트 이름입니다." : "필수항목입니다."
    );
    setIsValidate(!exists && inputValue !== "");
  };

  const handleSubmitWishList = async () => {
    if (isValidate) {
      const result = await postNewWishList(name);
      if (result) {
        toast.info("위시리스트가 생성되었습니다.");
        handleClose();
      } else {
        toast.info("생성시 오류가 발생하였습니다. 다시 시도해주세요.");
      }
    }
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
        <h1>새 위시리스트</h1>

        <h3>{`위시리스트 목록 (${memberWishList.length})`}</h3>
        <div className={modalStyles.wishListContainer}>
          {memberWishList.map((wish) => (
            <div key={wish.wishListId} className={modalStyles.wishListItem}>
              <span className={modalStyles.wishListItemText}>{wish.name}</span>
              <FaRegEdit
                size={"14px"}
                className={modalStyles.wishItemEditButton}
              />
            </div>
          ))}
        </div>
        <UniversalInput
          label="wishlist name"
          value={name}
          onChange={handleChangeName}
          placeholder="위시리스트 이름"
          type="text"
          id="wishlist"
          errorMsg={errorMsg}
          isValidate={isValidate}
        />
        <button
          className={modalStyles.submitButton}
          onClick={handleSubmitWishList}
        >
          추가
        </button>
      </div>
    </div>
  );
};

export default NewWishListModal;
