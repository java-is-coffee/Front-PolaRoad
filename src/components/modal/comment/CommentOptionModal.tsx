import { useEffect } from "react";
import modalStyles from "./CommentOptionModal.module.css";
import { useModal } from "hooks/modal/ModalProvider";
import ModalOption from "enum/modalOptionTypes";
import deleteComment from "api/comments/deleteComment";
import { CommentDetails } from "interface/comments/ICommentsDTO";

interface CommentIdProps {
  commentDetails?: CommentDetails;
  setCommentList?: React.Dispatch<React.SetStateAction<CommentDetails[]>>;
  commentList?: CommentDetails[];
}

const CommentOptionModal = ({
  commentDetails,
  setCommentList,
  commentList,
}: CommentIdProps) => {
  const { openModal, closeModal } = useModal();

  // Esc 눌렀을때 모달 탈출n
  const handleKeyUp = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      openModal(ModalOption.WARNING);
    }
  };
  // 모달 바깥쪽 눌렀을떄 모달 탈출
  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    closeModal(ModalOption.COMMENT_OPTION);
  };
  // 컴포넌트 랜더링시에 한번만 리스너 추가
  useEffect(() => {
    document.addEventListener("keyup", handleKeyUp);
    return () => {
      document.removeEventListener("keyup", handleKeyUp);
    };
    // eslint-disable-next-line
  }, []);

  const handleDeleteComment = () => {
    if (
      commentDetails !== undefined &&
      setCommentList !== undefined &&
      commentList !== undefined
    ) {
      const newCommetList = commentList.filter(
        (item) => item !== commentDetails
      );
      deleteComment(commentDetails.reviewId);
      setCommentList(newCommetList);
    }

    closeModal(ModalOption.COMMENT_OPTION);
    // 삭제 이후, 저는 post를 리덕스로 관리하고 해당 포스트를 초기화 하여 다시 새로 불러오는 형식으로 구현했습니다만. prop 형식으로 구현해볼까요? 삭제 자체는 동작되는 것 확인했습니다.
  };

  const handleCancle = () => {
    closeModal(ModalOption.COMMENT_OPTION);
  };

  const handleEdit = () => {
    openModal(ModalOption.COMMENT_EDIT, { commentDetails: commentDetails });
  };

  return (
    <div className={modalStyles.backdrop} onClick={handleBackdropClick}>
      <div
        className={modalStyles.postOptionModal}
        onClick={(e) => e.stopPropagation()}
      >
        <button className={modalStyles.option} onClick={handleEdit}>
          댓글 수정
        </button>
        <button className={modalStyles.delete} onClick={handleDeleteComment}>
          댓글 삭제
        </button>
        <button className={modalStyles.option} onClick={handleCancle}>
          취소
        </button>
      </div>
    </div>
  );
};

export default CommentOptionModal;
