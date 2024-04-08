import { useEffect } from "react";
import WebHeader from "../components/header/web/WebHeader";
import MobileHeader from "../components/header/mobile/MobileHeader";
import ExploreContainer from "../containers/explore/ExploreContainer";
import SearchDropdown from "../components/dropDown/search/SearchDropdown";
import { useMediaQuery } from "@mui/material";
import BottomNavigator from "components/bottom/BottomNavigator";

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

function Explore() {
  const { registerModal, closeModal } = useModal();
  const isSmallScreen = useMediaQuery("(max-width: 767px)");
  //   1. 낮은 해상도의 PC, 태블릿 가로 : ~1024px
  // 2. 테블릿 가로 : 768px ~ 1023px
  // 3. 모바일 가로, 태블릿 : 480px ~ 767px
  // 4. 모바일 : ~ 480px
  useEffect(() => {
    registerModal(ModalOption.SEARCH, <SearchDropdown />);
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
    return () => closeModal(ModalOption.SEARCH);
    // eslint-disable-next-line
  }, []);
  return (
    <div>
      {isSmallScreen ? <MobileHeader /> : <WebHeader />}
      <ExploreContainer />
      <div style={{ position: "fixed", bottom: "0%", width: "100%" }}>
        {isSmallScreen ? <BottomNavigator /> : ""}
      </div>
    </div>
  );
}

export default Explore;
