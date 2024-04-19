import { useEffect } from "react";
import modalStyles from "./CommentOptionModal.module.css";
import { useModal } from "hooks/modal/ModalProvider";
import ModalOption from "enum/modalOptionTypes";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { setPostId } from "../../../redux/reducers/newPost/newPostReducers";

function CommentOptionModal() {
  const { openModal, closeModal } = useModal();
  const dispatch = useDispatch();

  // Esc 눌렀을때 모달 탈출n
  const handleKeyUp = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      openModal(ModalOption.WARNING);
    }
  };
  // 모달 바깥쪽 눌렀을떄 모달 탈출
  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      openModal(ModalOption.WARNING, { modalType: ModalOption.POST });
    }
  };
  // 컴포넌트 랜더링시에 한번만 리스너 추가
  useEffect(() => {
    document.addEventListener("keyup", handleKeyUp);
    return () => {
      document.removeEventListener("keyup", handleKeyUp);
    };
    // eslint-disable-next-line
  }, []);

  // 모달 생성시 postId 적용
  useEffect(() => {
    dispatch(setPostId());
    //eslint-disable-next-line
  }, []);

  return (
    <div className={modalStyles.modalBackdrop} onClick={handleBackdropClick}>
      <div className={modalStyles.wrapper} onClick={handleBackdropClick}>
        test
      </div>
    </div>
  );
}

export default CommentOptionModal;
