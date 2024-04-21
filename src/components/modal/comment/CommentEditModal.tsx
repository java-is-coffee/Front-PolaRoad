import { useState } from "react";
import modalStyles from "./CommentEditModal.module.css";
import { useModal } from "hooks/modal/ModalProvider";
import ModalOption from "enum/modalOptionTypes";
import { CommentDetails, EditComment } from "interface/comments/ICommentsDTO";
import patchEditComment from "api/comments/patchEditComment";
import { toast } from "react-toastify";
import getSingleCommentInfo from "api/comments/getSingleCommentInfo";

interface CommentIdProps {
  commentDetails?: CommentDetails;
  setCommentList?: React.Dispatch<React.SetStateAction<CommentDetails[]>>;
  commentList?: CommentDetails[];
}

const CommentEditModal = ({ commentDetails, commentList }: CommentIdProps) => {
  const { closeModal } = useModal();

  // 모달 바깥쪽 눌렀을떄 모달 탈출
  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    closeModal(ModalOption.COMMENT_EDIT);
  };

  const [commentContent, setCommentContent] = useState<string>(
    commentDetails !== undefined ? commentDetails.content : ""
  );

  const getBeforComment = async () => {
    if (commentDetails) {
      const beforeComment = await getSingleCommentInfo(commentDetails.reviewId);
      return beforeComment;
    } else return null;
  };

  const handleSubmitComment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const beforeComment = await getBeforComment();
    if (commentContent === "") return;
    if (commentDetails !== undefined && beforeComment) {
      const newComment: EditComment = {
        content: commentContent,
        editPhotoList: beforeComment.reviewPhotoInfoList,
      };
      const result: CommentDetails | null = await patchEditComment(
        newComment,
        commentDetails.reviewId
      );

      if (result && commentList) {
        toast.success("수정 완료");
        commentList.forEach((item) => {
          if (item.reviewId === commentDetails.reviewId) {
            item.content = commentContent;
            return;
          }
        });
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
