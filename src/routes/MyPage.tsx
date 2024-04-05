import { useEffect } from "react";
import Header from "../components/header/Header";
import MyPageContainer from "../containers/myPage/MyPageContainer";
import ModalOption from "../enum/modalOptionTypes";
import { useModal } from "../hooks/modal/ModalProvider";
import NewPostModal from "../components/modal/newPost/NewPostModal";
import WarningModal from "components/modal/warn/WarningModal";
import EditProfileImgModal from "components/modal/profileImg/EditProfileImgModal";
import PostPreviewModal from "components/modal/post/PostPreviewModal";

function MyPage() {
  const { registerModal, closeModal } = useModal();
  useEffect(() => {
    registerModal(ModalOption.POST, <NewPostModal />);
    registerModal(ModalOption.WARNING, <WarningModal />);
    registerModal(ModalOption.EDIT_PROFILE_IMG, <EditProfileImgModal />);
    registerModal(ModalOption.POST_PREVIEW, <PostPreviewModal />);
    return () => {
      closeModal(ModalOption.POST);
      closeModal(ModalOption.WARNING);
      closeModal(ModalOption.EDIT_PROFILE_IMG);
      closeModal(ModalOption.POST_PREVIEW);
    };
    // eslint-disable-next-line
  }, []);
  return (
    <div>
      <Header />
      <MyPageContainer />
    </div>
  );
}

export default MyPage;
