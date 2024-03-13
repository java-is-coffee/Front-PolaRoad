import { useEffect } from "react";
import Header from "../components/header/Header";
import MyPageContainer from "../containers/myPage/MyPageContainer";
import ModalOption from "../enum/modalOptionTypes";
import { useModal } from "../hooks/modal/ModalProvider";
import NewPostModal from "../components/modal/newPost/NewPostModal";

function MyPage() {
  const { registerModal, closeModal } = useModal();
  useEffect(() => {
    registerModal(ModalOption.POST, <NewPostModal />);
    return () => closeModal(ModalOption.POST);
  }, []);
  return (
    <div>
      <Header />
      <MyPageContainer />
    </div>
  );
}

export default MyPage;
