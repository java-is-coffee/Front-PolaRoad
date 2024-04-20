import useBucket from "hooks/bucket/useBucket";
import { CommentDetails } from "interface/comments/ICommentsDTO";
import { useEffect, useState } from "react";
import commentStyles from "./SingleComment.module.css";
import { IconButton } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useModal } from "hooks/modal/ModalProvider";
import ModalOption from "enum/modalOptionTypes";
import secureLocalStorage from "react-secure-storage";
import patchCommentGood from "api/comments/patchCommentGood";

interface SingleCommentProps {
  commentDetails: CommentDetails;
  handleImgClick: (imgUrl: string) => void;
  setCommentList: React.Dispatch<React.SetStateAction<CommentDetails[]>>;
  commentList: CommentDetails[];
}

function SingleComment({
  commentDetails,
  handleImgClick,
  setCommentList,
  commentList,
}: SingleCommentProps) {
  const [userProfileImg, setUserProfileImg] = useState<string | null>("");
  const [isActiveHeart, setIsActiveHeart] = useState<boolean>(
    commentDetails.memberIsLiked
  );
  // const [formattedDate, setFormattedDate] = useState<string>("");ㄴ
  const [commentImg, setCommentImg] = useState<string[]>([]);
  const [showImages, setShowImages] = useState<boolean>(false);
  const { getImage } = useBucket();
  const { openModal } = useModal();

  //유저 id
  const userInfo = secureLocalStorage.getItem("member");

  useEffect(() => {
    const fetchImage = async () => {
      if (commentDetails.profileImage) {
        const result = await getImage(commentDetails.profileImage);
        setUserProfileImg(result);
      }
    };
    fetchImage();
    //eslint-disable-next-line
  }, []);

  // useEffect(() => {
  //   const updatedDate = new Date(commentDetails.updatedTime);
  //   const formatted = updatedDate.toLocaleDateString("ko-KR", {
  //     year: "numeric",
  //     month: "2-digit",
  //     day: "2-digit",
  //   });
  //   setFormattedDate(formatted);
  // }, [commentDetails.updatedTime]);

  useEffect(() => {
    const fetchReviewImg = async () => {
      const imgUrls: string[] = [];
      for (const img of commentDetails.reviewPhotoList) {
        const imgUrl = await getImage(img);
        if (imgUrl) {
          imgUrls.push(imgUrl);
        }
      }
      setCommentImg(imgUrls);
    };

    fetchReviewImg();

    //eslint-disable-next-line
  }, []);

  const handleCommentGood = async (commentId: number) => {
    const result = await patchCommentGood(commentId);
    if (result === true) setIsActiveHeart(true);
    else setIsActiveHeart(false);
  };

  return (
    <div className={commentStyles.singleCommentWrapper}>
      <div className={commentStyles.commentImgWrapper}>
        <div className={commentStyles.commentInfo}>
          <div className={commentStyles.profileImg}>
            {userProfileImg ? (
              <img
                className={commentStyles.profileImg}
                src={userProfileImg}
                alt="썸네일"
                width="100%"
                height="100%"
              />
            ) : (
              <img src={"/basic/profile.png"} alt="default-user" />
            )}
          </div>
          <div className={commentStyles.commentDetail}>
            <span className={commentStyles.name}>
              {commentDetails.nickname}
            </span>
            <div className={commentStyles.contents}>
              <span>{commentDetails.content}</span>
              {commentDetails.reviewPhotoList.length > 0 && (
                <div
                  className={commentStyles.viewImgButton}
                  onClick={() => setShowImages(!showImages)}
                >
                  사진보기
                </div>
              )}
            </div>
          </div>
        </div>
        <div className={commentStyles.buttons}>
          {userInfo === commentDetails.memberId ? (
            <IconButton
              onClick={() =>
                openModal(ModalOption.COMMENT_OPTION, {
                  commentDetails: commentDetails,
                  setCommentList: setCommentList,
                  commentList: commentList,
                })
              }
            >
              <MoreHorizIcon />
            </IconButton>
          ) : (
            ""
          )}
          {isActiveHeart ? (
            <img
              src={"/icons/like/selected-heart.png"}
              style={{ width: "14px", height: "14px" }}
              alt="active-heart"
              onClick={() => handleCommentGood(commentDetails.reviewId)}
            />
          ) : (
            <img
              src={"/icons/like/default-heart.png"}
              style={{ width: "14px", height: "14px" }}
              alt="default-heart"
              onClick={() => handleCommentGood(commentDetails.reviewId)}
            />
          )}
        </div>
      </div>
      {showImages && (
        <div className={commentStyles.imgContainer}>
          {commentImg.map((img, index) => (
            <div
              key={index}
              className={commentStyles.commentImg}
              onClick={() => handleImgClick(img)}
            >
              <img src={img} alt="댓글 사진" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SingleComment;
