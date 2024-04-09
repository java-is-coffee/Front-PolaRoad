import React from "react";
import modalStyles from "./WarningModal.module.css";
import { useModal } from "../../../hooks/modal/ModalProvider";
import ModalOption from "../../../enum/modalOptionTypes";
import { useDispatch, useSelector } from "react-redux";
import { resetPostDetails } from "../../../redux/reducers/newPost/newPostReducers";
import useBucket from "hooks/bucket/useBucket";
import { RootState } from "redux/store/store";

interface WarningModalProps {
  modalType?: ModalOption;
}

const WarningModal = ({ modalType }: WarningModalProps) => {
  const { closeModal } = useModal();
  const { deleteImage } = useBucket();
  const cardList = useSelector(
    (state: RootState) => state.newPost.postDetail.cards
  );
  const dispatch = useDispatch();

  if (!modalType) return <div></div>;

  // 모달 타입에 따른 메시지 결정
  const messageInfo = {
    title:
      modalType === ModalOption.ALBUM
        ? "앨범을 삭제하시겠어요?"
        : "포스트를 삭제하시겠어요?",
    description:
      "작성 중인 내용이 저장되지 않을 수 있습니다. 정말 닫으시겠습니까?",
  };

  const handleExit = () => {
    // 포스트 또는 앨범에 따라 필요한 상태 리셋 또는 삭제 로직 추가
    if (modalType === ModalOption.POST) {
      dispatch(resetPostDetails());
      cardList.forEach((card) => {
        if (card.image) {
          deleteImage(card.image);
        }
      });
    }
    closeModal(ModalOption.WARNING);
    closeModal(modalType); // modalType에 따라 해당 모달을 닫음
  };

  const handleCancel = () => {
    closeModal(ModalOption.WARNING); // 경고 모달만 닫음
  };

  return (
    <div className={modalStyles.backdrop}>
      <div className={modalStyles.warningModalContainer}>
        <h2>{messageInfo.title}</h2>
        <p>{messageInfo.description}</p>
        <button className={modalStyles.delete} onClick={handleExit}>
          삭제
        </button>
        <button className={modalStyles.cancel} onClick={handleCancel}>
          취소
        </button>
      </div>
    </div>
  );
};

export default WarningModal;
