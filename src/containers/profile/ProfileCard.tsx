import ProfileImg from "../../components/user/ProfileImg";
import { IoIosSettings } from "react-icons/io";
import profileStyles from "./ProfileCard.module.css";
import UserOptionBtn from "../../components/button/user/UserOptionBtn";
import UserActionBtn from "../../components/button/user/UserActionBtn";
import { CgFileAdd } from "react-icons/cg";
import { MdOutlinePhotoAlbum } from "react-icons/md";
import ModalOption from "../../enum/modalOptionTypes";
import { IMemberInfoDetails } from "interface/member/IMemberInfoDetails";
import useBucket from "hooks/bucket/useBucket";
import { useEffect, useState } from "react";
import { useModal } from "hooks/modal/ModalProvider";

interface ProfileCardProps {
  memberInfo: IMemberInfoDetails;
}

function ProfileCard({ memberInfo }: ProfileCardProps) {
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

  const handleEditProfileImg = () => {
    openModal(ModalOption.EDIT_PROFILE_IMG);
  };

  const handleOpenUserSetting = () => {
    openModal(ModalOption.USER_SETTING);
  };

  return (
    <div className={profileStyles.card}>
      <div
        className={profileStyles.imgContainer}
        onClick={handleEditProfileImg}
      >
        <ProfileImg size={"200px"} imgUrl={profileImgURL} />
      </div>
      <div className={profileStyles.header}>
        <span>{memberInfo.nickname}</span>
        <div className={profileStyles.action}>
          <UserOptionBtn name="앨범보기" />
          <UserOptionBtn
            name="프로필 변경"
            clickAction={handleEditProfileImg}
          />
          <IoIosSettings size={"24px"} onClick={handleOpenUserSetting} />
        </div>
      </div>
      <div className={profileStyles.stat}>
        <span>{`게시물 ${memberInfo.postNumber}`}</span>
        <span>{`팔로워 ${memberInfo.followedNumber}`}</span>
        <span>{`팔로우 ${memberInfo.followingNumber}`}</span>
      </div>
      <div className={profileStyles.username}>{memberInfo.name}</div>
      <UserActionBtn
        name="New post"
        icon={<CgFileAdd size={"24px"} />}
        type={ModalOption.POST}
      />
      <UserActionBtn
        name="New album"
        icon={<MdOutlinePhotoAlbum size={"24px"} />}
        type={ModalOption.ALBUM}
      />
    </div>
  );
}
export default ProfileCard;
