import { useState } from "react";
import modalStyles from "./CommentEditModal.module.css";
import { useModal } from "hooks/modal/ModalProvider";
import ModalOption from "enum/modalOptionTypes";
import { CommentDetails, EditComment } from "interface/comments/ICommentsDTO";
import patchEditComment from "api/comments/patchEditComment";
import { toast } from "react-toastify";

interface CommentIdProps {
  commentDetails?: CommentDetails;
}

const CommentEditModal = ({ commentDetails }: CommentIdProps) => {
  const { closeModal } = useModal();

  // 모달 바깥쪽 눌렀을떄 모달 탈출
  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    closeModal(ModalOption.COMMENT_EDIT);
  };

  const [commentContent, setCommentContent] = useState<string>(
    commentDetails !== undefined ? commentDetails.content : ""
  );

  const handleSubmitComment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (commentContent === "") return;
    if (commentDetails !== undefined) {
      const newComment: EditComment = {
        content: commentContent,
        editPhotoList: [
          {
            reviewPhotoId: 0,
            reviewPhotoUrl: "",
          },
        ],
      };
      const result: CommentDetails | null = await patchEditComment(
        newComment,
        commentDetails.reviewId
      );

      if (result) {
        toast.success("수정 완료");
        closeModal(ModalOption.COMMENT_EDIT);
        closeModal(ModalOption.COMMENT_OPTION);
      }
    }
  };
  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCommentContent(value);
  };

  return (
    <div className={modalStyles.wrapper}>
      <div className={modalStyles.backdrop} onClick={handleBackdropClick}>
        <div
          className={modalStyles.postOptionModal}
          onClick={(e) => e.stopPropagation()}
        >
          <h1>댓글 수정</h1>
          <div className={modalStyles.previewImgContainer}></div>
          <div>
            <form
              onSubmit={handleSubmitComment}
              className={modalStyles.commentInput}
            >
              <input
                placeholder="댓글 작성"
                value={commentContent}
                onChange={handleCommentChange}
                required
              />
              <button type="submit">수정</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentEditModal;
