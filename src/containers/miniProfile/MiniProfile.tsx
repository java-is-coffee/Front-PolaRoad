import ProfileImg from "../../components/user/ProfileImg";

import profileStyles from "./MiniProfile.module.css";
import useBucket from "hooks/bucket/useBucket";
import { useEffect, useState } from "react";
import { useModal } from "hooks/modal/ModalProvider";
import { IOtherMemberInfo } from "interface/member/IOtherMemberInfo";

interface MiniProfileProps {
  memberInfo: IOtherMemberInfo;
}

function MiniProfile({ memberInfo }: MiniProfileProps) {
  const [profileImgURL, setProfileImgURL] = useState<string>("");
  const { getImage } = useBucket();
  const { openModal } = useModal();

  useEffect(() => {
    const fetchProfileImg = async () => {
      if (memberInfo.profileImage) {
        const imgUrl = await getImage(memberInfo.profileImage);
        if (imgUrl) setProfileImgURL(imgUrl);
      }
    };
    fetchProfileImg();
    // eslint-disable-next-line
  }, []);

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
    </div>
  );
}
export default MiniProfile;
