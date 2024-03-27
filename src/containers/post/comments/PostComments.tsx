import getPostComments from "api/post/getPostComments";
import SingleComment from "components/comments/SingleComment";
import { ICommentDTO } from "interface/comments/ICommentsDTO";
import { useEffect, useState } from "react";

interface PostCommentsProps {
  postId: string | undefined;
}

function PostComments({ postId }: PostCommentsProps) {
  const [commentList, setCommentList] = useState<ICommentDTO[]>([]);
  const fetchComments = async () => {
    if (postId) {
      const result = await getPostComments(postId);
      if (result) {
        setCommentList(result);
      } else {
        console.log("댓글 불러오기 실패");
      }
    }
  };
  useEffect(() => {
    fetchComments();
    //eslint-disable-next-line
  }, []);
  return (
    <div>
      <h2>댓글</h2>
      {commentList.map((comment) => {
        return (
          <SingleComment key={comment.reviewId} commentDetails={comment} />
        );
      })}
      <input placeholder="댓글 작성" />
    </div>
  );
}

export default PostComments;
