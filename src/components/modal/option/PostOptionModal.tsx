import React from "react";
import modalStyles from "./PostOptionModal.module.css";
import { useModal } from "../../../hooks/modal/ModalProvider";
import ModalOption from "../../../enum/modalOptionTypes";
import postFollowMember from "api/follow/postFollowMember";

interface PostOptionModalProps {
  memberId: number;
}

const PostOptionModal = ({ memberId }: PostOptionModalProps) => {
  const { closeModal } = useModal();
  // "취소" 버튼 클릭 시 실행될 함수
  const handleCancel = () => {
    closeModal(ModalOption.POSTOPTION); // 경고 모달을 닫음
  };

  const handleFollow = async () => {
    const result = await postFollowMember(memberId);
    if (result) closeModal(ModalOption.POSTOPTION);
  };

  return (
    <div className={modalStyles.backdrop} onClick={handleCancel}>
      <div
        className={modalStyles.postOptionModal}
        onClick={(e) => e.stopPropagation()}
      >
        <button className={modalStyles.report}>신고</button>
        <button className={modalStyles.option} onClick={handleFollow}>
          팔로우
        </button>
        <button className={modalStyles.option}>저장</button>
        <button className={modalStyles.option}>공유</button>
        <button className={modalStyles.option}>링크 복사</button>
        <button className={modalStyles.option}>계정 정보</button>
        <button className={modalStyles.option} onClick={handleCancel}>
          취소
        </button>
      </div>
    </div>
  );
};

export default PostOptionModal;
