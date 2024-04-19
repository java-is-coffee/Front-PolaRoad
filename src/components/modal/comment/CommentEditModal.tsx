import { useState } from "react";
import modalStyles from "./CommentEditModal.module.css";
import { useModal } from "hooks/modal/ModalProvider";
import ModalOption from "enum/modalOptionTypes";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { CommentDetails, INewComment } from "interface/comments/ICommentsDTO";
import useBucket from "hooks/bucket/useBucket";
import { IUploadImage } from "interface/bucket/IUploadImage";
import getPostComments from "api/comments/getPostComments";
import { toast } from "react-toastify";
import postNewComment from "api/comments/postNewComment";
import { useParams } from "react-router-dom";

interface CommentIdProps {
  commentDetails?: CommentDetails;
}

const CommentEditModal = ({ commentDetails }: CommentIdProps) => {
  const { closeModal } = useModal();

  const { postId } = useParams();

  // 모달 바깥쪽 눌렀을떄 모달 탈출
  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    closeModal(ModalOption.COMMENT_EDIT);
  };
  // 불러온 댓글
  const [commentList, setCommentList] = useState<CommentDetails[]>([]);
  const [hasNext, setHasNext] = useState<boolean>(false);
  //새로운 코멘트용 state
  const [commentImgUrls, setCommentImgUrls] = useState<string[]>([]);
  const [commentContent, setCommentContent] = useState<string>("");
  // 이미지 프로뷰 state
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const { uploadImage } = useBucket();
  const [page, setPage] = useState<number>(1);

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!event.target.files || event.target.files.length === 0 || !postId) {
      return;
    }
    const files = Array.from(event.target.files);
    const previewUrls = files.map((file) => URL.createObjectURL(file));
    setImagePreviews(previewUrls); // 프리뷰 URL 상태 업데이트
    try {
      // Promise.all을 사용하여 모든 이미지 업로드를 병렬로 처리
      const uploadPromises = files.map(async (file) => {
        if (commentDetails !== undefined) {
          const imageInfo: IUploadImage = {
            postUserId: commentDetails!.memberId,
            postId: postId,
            image: file,
          };
          return uploadImage({ type: "COMMENT", imageInfo });
        }
      });
      const imageUrls = await Promise.all(uploadPromises);

      // 성공적으로 업로드된 이미지 URL들만 상태에 추가
      const successfulUploads = imageUrls.filter(
        (url): url is string => url !== null
      );
      if (successfulUploads.length > 0) {
        setCommentImgUrls((prev) => [...prev, ...successfulUploads]);
      } else {
        toast.error("이미지 업로딩에 실패했습니다.");
      }
    } catch (error) {
      console.error("이미지 업로드 중 오류 발생", error);
      toast.error("이미지 업로딩 중 오류가 발생했습니다.");
    }
  };

  const handleSubmitComment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!postId || commentContent === "") return;
    const newComment: INewComment = {
      postId: Number(postId),
      memberId: 0,
      content: commentContent,
      reviewPhotoList: commentImgUrls,
    };
    const result: CommentDetails | null = await postNewComment(newComment);
    if (result) {
      setCommentList((prev) => [...prev, result]);
      setCommentContent(() => "");
      setImagePreviews([]);
      getMoreComment();
    }
  };
  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCommentContent(value);
  };

  const getMoreComment = async () => {
    // 다음 코멘트가 없는 경우 그냥 리턴
    if (!hasNext || !postId) return;
    const nextPage = page + 1;
    const addComments = await getPostComments(postId, nextPage);
    if (addComments && addComments.content) {
      setCommentList((prev) => [...prev, ...addComments.content]);
      setPage(nextPage);
      setHasNext(addComments.hasNext);
    }
  };

  console.log(commentList);
  console.log(imagePreviews);

  return (
    <div className={modalStyles.backdrop} onClick={handleBackdropClick}>
      <div
        className={modalStyles.postOptionModal}
        onClick={(e) => e.stopPropagation()}
      >
        <h1>댓글 수정</h1>
        <div>
          <form
            onSubmit={handleSubmitComment}
            className={modalStyles.commentInput}
          >
            <label htmlFor={`file-${postId}`}>
              <AiOutlineCloudUpload size={"24px"} />
            </label>
            <input
              type="file"
              name={`file-${postId}`}
              id={`file-${postId}`}
              accept="image/*"
              style={{ display: "none" }}
              multiple
              onChange={handleImageUpload}
            />
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
  );
};

export default CommentEditModal;
