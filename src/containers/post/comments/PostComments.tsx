import getPostComments from "api/comments/getPostComments";
import SingleComment from "components/comments/SingleComment";
import { AiOutlineCloudUpload } from "react-icons/ai";
import {
  CommentDetails,
  ICommentDTO,
  INewComment,
} from "interface/comments/ICommentsDTO";
import { useEffect, useState } from "react";
import { IUploadImage } from "interface/bucket/IUploadImage";
import useBucket from "hooks/bucket/useBucket";
import { toast } from "react-toastify";
import { IoMdClose } from "react-icons/io";
import containerStyles from "./PostComments.module.css";
import postNewComment from "api/comments/postNewComment";

interface PostCommentsProps {
  postId: string | undefined;
  memberId: number;
}

function PostComments({ postId, memberId }: PostCommentsProps) {
  const [commentList, setCommentList] = useState<CommentDetails[]>([]);
  const [hasNext, setHasNext] = useState<boolean>(false);
  const [commentImgUrls, setCommentImgUrls] = useState<string[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [commentContent, setCommentContent] = useState<string>("");
  const { uploadImage, deleteImage } = useBucket();
  useEffect(() => {
    const fetchComments = async () => {
      if (postId) {
        const result: ICommentDTO | null = await getPostComments(postId, 1);
        if (result) {
          setCommentList(result.content);
          setHasNext(result.hasNext);
        } else {
          console.log("댓글 불러오기 실패");
        }
      }
    };
    fetchComments();
    //eslint-disable-next-line
  }, [postId]);

  const handleSubmitComment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!postId) return;
    const newComment: INewComment = {
      postId: Number(postId),
      memberId: 0,
      content: commentContent,
      reviewPhotoList: commentImgUrls,
    };
    postNewComment(newComment);
  };

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
        const imageInfo: IUploadImage = {
          postUserId: memberId,
          postId: postId,
          image: file,
        };
        return uploadImage({ type: "COMMENT", imageInfo });
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

  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCommentContent(value);
  };

  const openModal = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={containerStyles.wrapper}>
      {isModalOpen && (
        <div className={containerStyles.previewBackdrop} onClick={closeModal}>
          <div
            className={containerStyles.previewModal}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedImage || undefined}
              alt="Selected"
              className={containerStyles.modalImage}
            />
          </div>
        </div>
      )}
      <h2>댓글</h2>
      {commentList &&
        commentList.map((comment) => {
          return (
            <SingleComment key={comment.reviewId} commentDetails={comment} />
          );
        })}
      {imagePreviews.map((src, index) => (
        <div
          key={index}
          className={containerStyles.previewImgWrapper}
          onClick={() => openModal(src)}
        >
          <img
            src={src}
            alt="Image preview"
            className={containerStyles.previewImg}
          />
        </div>
      ))}
      <form onSubmit={handleSubmitComment}>
        <input placeholder="댓글 작성" onChange={handleCommentChange} />
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
        <button type="submit">작성</button>
      </form>
    </div>
  );
}

export default PostComments;
