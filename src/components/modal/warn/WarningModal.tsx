import React from "react";
import modalStyles from "./WarningModal.module.css";
import { useModal } from "../../../hooks/modal/ModalProvider";
import ModalOption from "../../../enum/modalOptionTypes";
import { useDispatch, useSelector } from "react-redux";
import { resetPostDetails } from "../../../redux/reducers/newPost/newPostReducers";
import useBucket from "hooks/bucket/useBucket";
import { RootState } from "redux/store/store";

const WarningModal = () => {
  const { closeModal } = useModal();
  const { deleteImage } = useBucket();
  const cardList = useSelector(
    (state: RootState) => state.newPost.postDetail.cards
  );
  const dispatch = useDispatch();

  // "나가기" 버튼 클릭 시 실행될 함수
  const handleExit = () => {
    dispatch(resetPostDetails()); // 포스트 상세 정보를 리셋
    cardList.forEach((card) => {
      if (card.imageUrl) {
        deleteImage(card.imageUrl);
      }
    });
    closeModal(ModalOption.WARNING);
    closeModal(ModalOption.POST); // 실제 포스트 모달을 닫음
  };

  // "취소" 버튼 클릭 시 실행될 함수
  const handleCancel = () => {
    closeModal(ModalOption.WARNING); // 경고 모달을 닫음
  };

  return (
    <div className={modalStyles.backdrop}>
      <div className={modalStyles.warningModalContainer}>
        <h2>포스트를 삭제하시겠어요?</h2>
        <p>작성 중인 내용이 저장되지 않을 수 있습니다. 정말 닫으시겠습니까?</p>
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
