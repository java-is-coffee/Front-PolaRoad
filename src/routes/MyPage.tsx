import { useEffect } from "react";
import Header from "../components/header/Header";
import MyPageContainer from "../containers/myPage/MyPageContainer";
import ModalOption from "../enum/modalOptionTypes";
import { useModal } from "../hooks/modal/ModalProvider";
import NewPostModal from "../components/modal/newPost/NewPostModal";
import WarningModal from "components/modal/warn/WarningModal";
import EditProfileImgModal from "components/modal/profileImg/EditProfileImgModal";

function MyPage() {
  const { registerModal, closeModal } = useModal();
  useEffect(() => {
    registerModal(ModalOption.POST, <NewPostModal />);
    registerModal(ModalOption.WARNING, <WarningModal />);
    registerModal(ModalOption.EDITPROFILEIMG, <EditProfileImgModal />);
    return () => {
      closeModal(ModalOption.POST);
      closeModal(ModalOption.WARNING);
      closeModal(ModalOption.EDITPROFILEIMG);
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
