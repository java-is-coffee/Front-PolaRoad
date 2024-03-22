import ProfileImg from "../../components/user/ProfileImg";
import { IoIosSettings } from "react-icons/io";
import profileStyles from "./ProfileCard.module.css";
import UserOptionBtn from "../../components/button/user/UserOptionBtn";
import UserActionBtn from "../../components/button/user/UserActionBtn";
import { CgFileAdd } from "react-icons/cg";
import { MdOutlinePhotoAlbum } from "react-icons/md";
import ModalOption from "../../enum/modalOptionTypes";

function ProfileCard() {
  const postNum = 10;
  const followerNum = 10;
  const followeesNum = 10;
  const username = "이지은";

  const userNickname = "밤양갱";

  return (
    <div className={profileStyles.card}>
      <div className={profileStyles.imgContainer}>
        <ProfileImg size={"200px"} />
      </div>
      <div className={profileStyles.header}>
        <span>{userNickname}</span>
        <div className={profileStyles.action}>
          <UserOptionBtn name="앨범보기" />
          <UserOptionBtn name="프로필 변경" />
          <IoIosSettings size={"24px"} />
        </div>
      </div>
      <div className={profileStyles.stat}>
        <span>{`게시물 ${postNum}`}</span>
        <span>{`팔로워 ${followerNum}`}</span>
        <span>{`팔로우 ${followeesNum}`}</span>
      </div>
      <div className={profileStyles.username}>{username}</div>
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
