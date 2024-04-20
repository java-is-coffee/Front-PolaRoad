import { useMediaQuery } from "@mui/material";
import getMemberInfo from "api/member/getMemberInfo";
import LogoHeader from "components/header/logoHeader/LogoHeader";
import SearchDropdown from "components/dropDown/search/SearchDropdown";
import Header from "components/header/web/WebHeader";
import CommentEditModal from "components/modal/comment/CommentEditModal";
import CommentOptionModal from "components/modal/comment/CommentOptionModal";
import MiniProfileModal from "components/modal/member/miniProfile/MiniProfileModal";
import NewPostModal from "components/modal/newPost/NewPostModal";
import PostOptionModal from "components/modal/option/PostOptionModal";
import ShareModal from "components/modal/shareModal/ShareModal";
import DeleteWarningModal from "components/modal/warn/deleteWarning/DeleteWarningModal";
import WarningModal from "components/modal/warn/WarningModal";
import AddPostWishList from "components/modal/wish/addPostWishList/AddPostWishList";
import PostDetailMobile from "containers/post/modlie/PostDetailsMoblie";
import PostDetail from "containers/post/PostDetails";
import ModalOption from "enum/modalOptionTypes";
import { useModal } from "hooks/modal/ModalProvider";
import { useEffect } from "react";
import secureLocalStorage from "react-secure-storage";

function Post() {
  const { registerModal, closeModal } = useModal();
  useEffect(
    () => {
      registerModal(ModalOption.POST_OPTION, <PostOptionModal />);
      registerModal(ModalOption.WARNING, <WarningModal />);
      registerModal(ModalOption.SHARE, <ShareModal />);
      registerModal(ModalOption.ADD_TO_WISH, <AddPostWishList />);
      registerModal(ModalOption.DELETE_WARNING, <DeleteWarningModal />);
      registerModal(ModalOption.OTHER_MEMBER_INFO, <MiniProfileModal />);
      registerModal(ModalOption.POST, <NewPostModal />);
      registerModal(ModalOption.COMMENT_OPTION, <CommentOptionModal />);
      registerModal(ModalOption.SEARCH, <SearchDropdown />);
      registerModal(ModalOption.COMMENT_EDIT, <CommentEditModal />);

      return () => {
        closeModal(ModalOption.POST);
        closeModal(ModalOption.WARNING);
        closeModal(ModalOption.POST_OPTION);
        closeModal(ModalOption.SHARE);
        closeModal(ModalOption.ADD_TO_WISH);
        closeModal(ModalOption.DELETE_WARNING);
        closeModal(ModalOption.OTHER_MEMBER_INFO);
        closeModal(ModalOption.COMMENT_OPTION);
        closeModal(ModalOption.SEARCH);
        closeModal(ModalOption.COMMENT_EDIT);
      };
    },
    //eslint-disable-next-line
    []
  );

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
      {isSmallScreen ? <LogoHeader /> : <Header />}
      {isSmallScreen ? <PostDetailMobile /> : <PostDetail />}
    </div>
  );
}

export default Post;
