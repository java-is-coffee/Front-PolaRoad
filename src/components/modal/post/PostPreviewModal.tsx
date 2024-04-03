import { useEffect, useState } from "react";
import modalStyle from "./PostPreviewModal.module.css";
import getPostDetails from "api/post/getPostDetails";
import { IPostDTO } from "interface/post/IPostDTO";
import secureLocalStorage from "react-secure-storage";
import PostMap from "components/map/PostMap";
import PostCardList from "containers/post/postCardList/web/PostCardList";
import PostComments from "containers/post/comments/PostComments";
import { toast } from "react-toastify";

interface PostPreviewModalProps {
  postId?: string;
}

function PostPreviewModal({ postId }: PostPreviewModalProps) {
  const [postDetails, setPostDetails] = useState<IPostDTO | null>(null);

  useEffect(() => {
    const getPostData = async () => {
      if (!postId) {
        toast.error("포스트를 불러오는데 오류가 발생했습니다.");
        return;
      }
      const result = await getPostDetails(postId);
      setPostDetails(result);
    };

    if (secureLocalStorage.getItem("accessToken")) {
      getPostData();
    } else {
      toast.error("로그인이 필요합니다.");
    }
  }, [postId]);

  return postDetails ? (
    <div className={modalStyle.overlay}>
      <div className={modalStyle.modal}>
        <button className={modalStyle.closeButton}>Close</button>
        <section className={modalStyle.container}>
          <article className={modalStyle.sideComponent}>
            <PostMap cards={postDetails.cards} />
          </article>
          <article className={modalStyle.mainComponent}>
            <PostCardList postDetails={postDetails} />
          </article>
          <article className={modalStyle.sideComponent}>
            <PostComments
              postId={postId}
              memberId={postDetails.memberInfo.memberId}
            />
          </article>
        </section>
      </div>
    </div>
  ) : (
    <div>정보를 불러올수 없습니다.</div>
  );
}

export default PostPreviewModal;
