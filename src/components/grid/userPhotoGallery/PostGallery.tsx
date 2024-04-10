import { useEffect, useRef, useState } from "react";
import UserPhotoCard from "../../card/userPhoto/UserPhotoCard";
import getMyPostList from "api/post/getMyPostList";
import { ISinglePost } from "interface/post/ISinglePost";
import gridStyle from "./UserPhotoGallery.module.css";

function PostGallery() {
  // post const
  const [postsData, setPostsData] = useState<ISinglePost[]>([]);
  const [postPage, setPostPage] = useState<number>(1);
  const [postHasNext, setPostHasNext] = useState<boolean>(true);
  const postAmount = 10;
  const observer = useRef<IntersectionObserver>();
  const lastPostElementRef = useRef(null); // 감시할 요소의 ref

  const fetchPostList = async () => {
    if (!postHasNext) return;
    const data = await getMyPostList(postPage, postAmount);
    if (data) {
      data.hasNext ? setPostPage((prev) => prev + 1) : setPostHasNext(false);
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
    observer.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && postHasNext) {
          fetchPostList();
        }
      },
      { threshold: 0.1 }
    );

    if (lastPostElementRef.current) {
      observer.current.observe(lastPostElementRef.current);
    }

    return () => observer.current?.disconnect();
    // eslint-disable-next-line
  }, [postPage]);

  return (
    <div className={gridStyle.gridGallery}>
      {postsData.map((singlePost, index) => (
        <UserPhotoCard key={index} singlePostData={singlePost} />
      ))}
      <div ref={lastPostElementRef} />
    </div>
  );
}

export default PostGallery;
