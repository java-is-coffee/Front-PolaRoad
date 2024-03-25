import { useEffect } from "react";
import Header from "../components/header/Header";
import MyPageContainer from "../containers/myPage/MyPageContainer";
import ModalOption from "../enum/modalOptionTypes";
import { useModal } from "../hooks/modal/ModalProvider";
import NewPostModal from "../components/modal/newPost/NewPostModal";
import WarningModal from "components/modal/warn/WarningModal";

function MyPage() {
  const { registerModal, closeModal } = useModal();
  useEffect(() => {
    registerModal(ModalOption.POST, <NewPostModal />);
    registerModal(ModalOption.WARNING, <WarningModal />);
    return () => {
      closeModal(ModalOption.POST);
      closeModal(ModalOption.WARNING);
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
