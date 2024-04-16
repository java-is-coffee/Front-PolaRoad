import { useParams } from "react-router-dom";
import containerStyles from "./PostDetails.module.css";
import { useEffect, useState } from "react";
import getPostDetails from "api/post/getPostDetails";
import { IPostDTO } from "interface/post/IPostDTO";
import secureLocalStorage from "react-secure-storage";
import useError from "hooks/error/useErrorHandler";
import PostComments from "./comments/PostComments";
import PostMap from "components/map/PostMap";
import PostCardListCarousel from "./postCardList/web/PostCardLIstCarousel";

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
    if (
      secureLocalStorage.getItem("accessToken") &&
      secureLocalStorage.getItem("refreshToken")
    ) {
      getPostData();
    } else {
      navigateOnError({ errorType: "AUTH", path: "/login" });
    }
    // eslint-disable-next-line
  }, []);

  if (!postId) return <div></div>;

  return postDetails ? (
    <section className={containerStyles.container}>
      <article className={containerStyles.sideComponent}>
        <PostMap cards={postDetails.cards} />
      </article>
      <article className={containerStyles.mainComponent}>
        <PostCardListCarousel
          postDetails={postDetails}
          postId={Number(postId)}
        />
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
