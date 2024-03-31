import Header from "components/header/Header";
import PostOptionModal from "components/modal/option/PostOptionModal";
import PostDetail from "containers/post/PostDetails";
import ModalOption from "enum/modalOptionTypes";
import { useModal } from "hooks/modal/ModalProvider";
import { useEffect } from "react";

function Post() {
  const { registerModal, closeModal } = useModal();
  useEffect(() => {
    registerModal(ModalOption.POSTOPTION, <PostOptionModal />);
    return () => {};
    closeModal(ModalOption.POSTOPTION);
    // eslint-disable-next-line
  }, []);
  return (
    <div>
      <Header />
      <PostDetail />
    </div>
  );
}

export default Post;
