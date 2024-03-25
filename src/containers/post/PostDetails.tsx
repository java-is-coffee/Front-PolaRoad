import { useNavigate, useParams } from "react-router-dom";
import containerStyles from "./PostDetails.module.css";
import { useEffect, useState } from "react";
import getPostDetails from "api/post/getPostDetails";
import { IPostDTO } from "interface/post/IPostDTO";
import { toast } from "react-toastify";
import PostCardList from "./postCardList/PostCardsList";
import secureLocalStorage from "react-secure-storage";
import useError from "hooks/error/useErrorHandler";

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
    console.log(result);
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
  return postDetails ? (
    <section className={containerStyles.container}>
      <article>맵</article>
      <PostCardList postDetails={postDetails} />
      <article>댓글</article>
    </section>
  ) : (
    <div>정보를 불러올수 없습니다.</div>
  );
}
export default PostDetail;
