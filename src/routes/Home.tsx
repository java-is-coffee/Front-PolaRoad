import { useEffect } from "react";
import Header from "../components/header/web/WebHeader";
import HomeComponent from "../components/Home/HomeComponent";
import HomeContainer from "../containers/home/HomeContainer";

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

function Home() {
  const { registerModal, closeModal } = useModal();
  useEffect(
    () => {
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
      };
    },
    //eslint-disable-next-line
    []
  );
  return (
    <div>
      <Header />
      <HomeComponent />
      <HomeContainer />
    </div>
  );
}

export default Home;
