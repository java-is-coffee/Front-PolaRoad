import getMemberInfo from "api/member/getMemberInfo";
import Header from "components/header/web/WebHeader";
import PostOptionModal from "components/modal/option/PostOptionModal";
import ShareModal from "components/modal/shareModal/ShareModal";
import AddPostWishList from "components/modal/wish/addPostWishList/AddPostWishList";
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
      registerModal(ModalOption.SHARE, <ShareModal />);
      registerModal(ModalOption.ADD_TO_WISH, <AddPostWishList />);
      return () => {
        closeModal(ModalOption.POST_OPTION);
        closeModal(ModalOption.SHARE);
        closeModal(ModalOption.ADD_TO_WISH);
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
  return (
    <div>
      <Header />
      <PostDetail />
    </div>
  );
}

export default Post;
