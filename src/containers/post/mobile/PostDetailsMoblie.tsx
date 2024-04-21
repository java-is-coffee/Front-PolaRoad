import { useParams } from "react-router-dom";
import containerStyles from "./PostDetailsMobile.module.css";
import { useEffect, useState } from "react";
import getPostDetails from "api/post/getPostDetails";
import { IPostDTO } from "interface/post/IPostDTO";
import secureLocalStorage from "react-secure-storage";
import useError from "hooks/error/useErrorHandler";
import PostMap from "components/map/PostMap";
import PostCardListCarousel from "../postCardList/web/PostCardLIstCarousel";
import PostComments from "../comments/PostComments";

function PostDetailMobile() {
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
      <PostCardListCarousel postDetails={postDetails} postId={Number(postId)} />
      <div className={containerStyles.mainContents}></div>
      <PostMap cards={postDetails.cards} />
      <PostComments
        postId={postId}
        memberId={postDetails.memberInfo.memberId}
      />
    </section>
  ) : (
    <div>정보를 불러올수 없습니다.</div>
  );
}
export default PostDetailMobile;
