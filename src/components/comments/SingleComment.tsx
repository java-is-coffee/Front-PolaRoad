import useBucket from "hooks/bucket/useBucket";
import { CommentDetails } from "interface/comments/ICommentsDTO";
import { useEffect, useState } from "react";
import commentStyles from "./SingleComment.module.css";

interface SingleCommentProps {
  commentDetails: CommentDetails;
}

function SingleComment({ commentDetails }: SingleCommentProps) {
  const [userProfileImg, setUserProfileImg] = useState<string | null>("");
  const [isActiveHeart, setIsActiveHeart] = useState<boolean>(false);
  const [formattedDate, setFormattedDate] = useState<string>("");
  const { getImage } = useBucket();

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

  useEffect(() => {
    const updatedDate = new Date(commentDetails.updatedTime);
    const formatted = updatedDate.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
    setFormattedDate(formatted);
  }, [commentDetails.updatedTime]);

  return (
    <div className={commentStyles.singleCommentWrapper}>
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
          <span className={commentStyles.name}>{commentDetails.nickname}</span>
          <div className={commentStyles.contents}>
            <span>{commentDetails.content}</span>
            {commentDetails.reviewPhotoInfoList && <button>사진보기</button>}
            <span>{formattedDate}</span>
          </div>
        </div>
      </div>
      <div onClick={() => setIsActiveHeart((prev) => !prev)}>
        {isActiveHeart ? (
          <img
            src={"/icons/like/selected-heart.png"}
            style={{ width: "14px", height: "14px" }}
            alt="active-heart"
          />
        ) : (
          <img
            src={"/icons/like/default-heart.png"}
            style={{ width: "14px", height: "14px" }}
            alt="default-heart"
          />
        )}
      </div>
    </div>
  );
}

export default SingleComment;
