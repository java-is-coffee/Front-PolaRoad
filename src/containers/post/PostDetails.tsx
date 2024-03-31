import { useParams } from "react-router-dom";
import containerStyles from "./PostDetails.module.css";
import { useEffect, useState } from "react";
import getPostDetails from "api/post/getPostDetails";
import { IPostDTO } from "interface/post/IPostDTO";
import secureLocalStorage from "react-secure-storage";
import useError from "hooks/error/useErrorHandler";
import PostComments from "./comments/PostComments";
import PostCardList from "./postCardList/web/PostCardList";
import PostMap from "components/map/PostMap";
import { useModal } from "hooks/modal/ModalProvider";
import ModalOption from "enum/modalOptionTypes";
import PostOptionModal from "components/modal/option/PostOptionModal";
import { IoReturnDownBack } from "react-icons/io5";

function PostDetail() {
  const { postId } = useParams();
  const [postDetails, setPostDetails] = useState<IPostDTO | null>(null);
  const { navigateOnError } = useError();
  const getPostData = async () => {
    if (!postId) {
      navigateOnError({ errorType: "PATH" });
      return;
    }
    const result = await getPostDetails(postId);
    setPostDetails(result);
  };
  useEffect(() => {
    if (secureLocalStorage.getItem("accessToken")) {
      getPostData();
    } else {
      navigateOnError({ errorType: "AUTH", path: "/login" });
    }
    // eslint-disable-next-line
  }, []);

  // 포스트 옵션 모달 설정
  const { registerModal, closeModal } = useModal();
  useEffect(() => {
    if (!postDetails) return;
    registerModal(
      ModalOption.POSTOPTION,
      <PostOptionModal memberId={postDetails?.memberInfo.memberId} />
    );
    return () => {
      closeModal(ModalOption.POSTOPTION);
    };
    // eslint-disable-next-line
  }, [postDetails]);
  return postDetails ? (
    <section className={containerStyles.container}>
      <article className={containerStyles.sideComponent}>
        <PostMap cards={postDetails.cards} />
      </article>
      <article className={containerStyles.mainComponent}>
        <PostCardList postDetails={postDetails} />
      </article>
      <article className={containerStyles.sideComponent}>
        <PostComments
          postId={postId}
          memberId={postDetails.memberInfo.memberId}
        />
      </article>
    </section>
  ) : (
    <div>정보를 불러올수 없습니다.</div>
  );
}
export default PostDetail;
