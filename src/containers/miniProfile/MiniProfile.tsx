import ProfileImg from "../../components/user/ProfileImg";

import profileStyles from "./MiniProfile.module.css";
import useBucket from "hooks/bucket/useBucket";
import { useEffect, useState } from "react";
import { IOtherMemberInfo } from "interface/member/IOtherMemberInfo";
import postFollowMember from "api/follow/postFollowMember";
import secureLocalStorage from "react-secure-storage";
import getIsFollowMember from "api/follow/getIsFollowMember";

interface MiniProfileProps {
  memberInfo: IOtherMemberInfo;
  memberId: number;
}

function MiniProfile({ memberInfo, memberId }: MiniProfileProps) {
  const [profileImgURL, setProfileImgURL] = useState<string>("");
  const { getImage } = useBucket();
  const [thumbnailImages, setThumbNailImages] = useState<string[]>([]);
  const [isFollowed, setIsFollowed] = useState<boolean>(false);
  const hostMemberId = secureLocalStorage.getItem("member");

  useEffect(() => {
    const fetchProfileImg = async () => {
      if (memberInfo.profileImage) {
        const imgUrl = await getImage(memberInfo.profileImage);
        if (imgUrl) setProfileImgURL(imgUrl);
      }
    };
    const fetchThumbnails = async () => {
      if (memberInfo.thumbnails && memberInfo.thumbnails.length > 0) {
        const thumbnailPromises = memberInfo.thumbnails.map((thumbnail) =>
          getImage(thumbnail)
        );
        const thumbnails = await Promise.all(thumbnailPromises);
        const validThumbnails = thumbnails.filter(
          (url): url is string => url !== null
        );
        setThumbNailImages(validThumbnails);
      }
    };

    //이부분은 수정해야할 것 같습니다. 너무 비효율적입니다.
    const isFollowed = async () => {
      if (memberInfo) {
        const checkFollow: boolean = await getIsFollowMember(memberId);
        if (checkFollow === true) {
          setIsFollowed(true);
        } else {
          setIsFollowed(false);
        }
      }
    };

    fetchProfileImg();
    fetchThumbnails();
    isFollowed();
    // eslint-disable-next-line
  }, []);

  const postFollowing = async () => {
    const data = await postFollowMember(
      memberId,
      isFollowed ? "언팔로우" : "팔로우"
    );
    if (data) setIsFollowed((prev) => !prev);
  };

  const handleFollowing = () => {
    postFollowing();
  };

  return (
    <div className={profileStyles.card}>
      <div className={profileStyles.imgContainer}>
        <ProfileImg size={"200px"} imgUrl={profileImgURL} onClick={() => {}} />
      </div>
      <div className={profileStyles.header}>
        <span>{memberInfo.nickname}</span>
      </div>
      <div className={profileStyles.stat}>
        <span>{`게시물 ${memberInfo.postNumber}`}</span>
        <span>{`팔로워 ${memberInfo.followedNumber}`}</span>
        <span>{`팔로우 ${memberInfo.followingNumber}`}</span>
      </div>
      <div className={profileStyles.username}>{memberInfo.name}</div>
      <div className={profileStyles.thumbnailGrid}>
        {thumbnailImages.map((thumbnail, index) => (
          <img src={thumbnail} alt="post 썸네일" key={index} />
        ))}
      </div>
      {hostMemberId !== memberId && (
        <button
          className={
            isFollowed
              ? profileStyles.unFollowButton
              : profileStyles.followButton
          }
          onClick={handleFollowing}
        >
          {isFollowed ? "언팔로우" : "팔로우"}
        </button>
      )}
    </div>
  );
}
export default MiniProfile;
