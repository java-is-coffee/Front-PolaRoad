import { useEffect, useState } from "react";
import UserPhotoCard from "../../card/userPhoto/UserPhotoCard";
import getMyPostList from "api/post/getMyPostList";
import { ISinglePost } from "interface/post/ISinglePost";
import gridStyle from "./UserPhotoGallery.module.css";

function PostGallery() {
  // post const
  const [postsData, setPostsData] = useState<ISinglePost[]>([]);
  const [postPage, setPostPage] = useState<number>(1);
  const postAmount = 10;

  const fetchPostList = async () => {
    const data = await getMyPostList(postPage, postAmount);
    if (data) {
      if (data?.maxPage > postPage) setPostPage((prev) => prev + 1);
      const newPosts = data.posts.filter(
        (newPost) =>
          !postsData.some(
            (existingPost) => existingPost.postId === newPost.postId
          )
      );
      setPostsData((prev) => [...prev, ...newPosts]);
    }
  };

  useEffect(() => {
    fetchPostList();
    // eslint-disable-next-line
  }, []);

  return (
    <div className={gridStyle.gridGallery}>
      {postsData.map((singlePost, index) => (
        <UserPhotoCard key={index} singlePostData={singlePost} />
      ))}
    </div>
  );
}

export default PostGallery;
