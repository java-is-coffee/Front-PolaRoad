import { useEffect } from "react";
import MyPageContainer from "../containers/myPage/MyPageContainer";

// 사용되는 모달 등록
import { useModal } from "hooks/modal/ModalProvider";
import ModalOption from "enum/modalOptionTypes";
import NewPostModal from "components/modal/newPost/NewPostModal";
import WarningModal from "components/modal/warn/WarningModal";
import EditProfileImgModal from "components/modal/profileImg/EditProfileImgModal";
import PostPreviewModal from "components/modal/post/PostPreviewModal";
import ShareModal from "components/modal/shareModal/ShareModal";
import UserInfoModal from "components/modal/userSetting/userInfo/UserInfoModal";
import PostOptionModal from "components/modal/option/PostOptionModal";
import UserSettingModal from "components/modal/userSetting/UserSettingModal";
import NewAlbumModal from "components/modal/album/newAlbum/NewAlbumModal";
import NewWishListModal from "components/modal/wish/newWishList/NewWishListModal";
import AlbumPreviewModal from "components/modal/album/albumPreview/AlbumPreviewModal";
import EditAlbumModal from "components/modal/album/editAlbum/EditAlbumModal";
import { useLocation, useNavigate } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";
import { toast } from "react-toastify";
import DeleteWarningModal from "components/modal/warn/deleteWarning/DeleteWarningModal";
import AddPostWishList from "components/modal/wish/addPostWishList/AddPostWishList";
import getMemberInfo from "api/member/getMemberInfo";
import MiniProfileModal from "components/modal/member/miniProfile/MiniProfileModal";
import { useMediaQuery } from "@mui/material";
import MyPageContainerMobile from "containers/myPage/mobile/MyPageContainerMoblie";
import WebHeader from "../components/header/web/WebHeader";
import LogoHeader from "components/header/logoHeader/LogoHeader";

function MyPage() {
  const { registerModal, closeModal } = useModal();
  useEffect(() => {
    registerModal(ModalOption.POST, <NewPostModal />);
    registerModal(ModalOption.WARNING, <WarningModal />);
    registerModal(ModalOption.WISH, <NewWishListModal />);
    registerModal(ModalOption.EDIT_PROFILE_IMG, <EditProfileImgModal />);
    registerModal(ModalOption.POST_PREVIEW, <PostPreviewModal />);
    registerModal(ModalOption.SHARE, <ShareModal />);
    registerModal(ModalOption.USER_SETTING, <UserSettingModal />);
    registerModal(ModalOption.USER_INFO, <UserInfoModal />);
    registerModal(ModalOption.POST_OPTION, <PostOptionModal />);
    registerModal(ModalOption.ALBUM, <NewAlbumModal />);
    registerModal(ModalOption.AlBUM_PREVIEW, <AlbumPreviewModal />);
    registerModal(ModalOption.DELETE_WARNING, <DeleteWarningModal />);
    registerModal(ModalOption.ALBUM_EDIT, <EditAlbumModal />);
    registerModal(ModalOption.ADD_TO_WISH, <AddPostWishList />);
    registerModal(ModalOption.OTHER_MEMBER_INFO, <MiniProfileModal />);
    return () => {
      closeModal(ModalOption.POST);
      closeModal(ModalOption.WARNING);
      closeModal(ModalOption.WISH);
      closeModal(ModalOption.EDIT_PROFILE_IMG);
      closeModal(ModalOption.POST_PREVIEW);
      closeModal(ModalOption.SHARE);
      closeModal(ModalOption.USER_SETTING);
      closeModal(ModalOption.USER_INFO);
      closeModal(ModalOption.POST_OPTION);
      closeModal(ModalOption.ALBUM);
      closeModal(ModalOption.AlBUM_PREVIEW);
      closeModal(ModalOption.DELETE_WARNING);
      closeModal(ModalOption.ALBUM_EDIT);
      closeModal(ModalOption.ADD_TO_WISH);
      closeModal(ModalOption.OTHER_MEMBER_INFO);
    };
    // eslint-disable-next-line
  }, []);

  // auth 관련
  const location = useLocation();
  const nav = useNavigate();
  useEffect(() => {
    const token = secureLocalStorage.getItem("accessToken");
    if (!token) {
      toast.error("로그인이 필요한 기능입니다.");
      nav("/login", { state: { from: location }, replace: true });
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const fetchMemberData = async () => {
      const data = await getMemberInfo();
      if (data) secureLocalStorage.setItem("member", data.memberId);
    };

    fetchMemberData();
    // eslint-disable-next-line
  }, []);

  const isSmallScreen = useMediaQuery("(max-width: 767px)");
  return (
    <div>
      {isSmallScreen ? <LogoHeader /> : <WebHeader />}
      {isSmallScreen ? <MyPageContainerMobile /> : <MyPageContainer />}
    </div>
  );
}

export default MyPage;
