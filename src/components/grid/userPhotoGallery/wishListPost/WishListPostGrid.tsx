import WishListPostCard from "components/card/wishList/wishListPostCard/WishListPostCard";
import gridStyles from "./WishListPostGrid.module.css";
import getWishListDetails from "api/wishlist/getWishListDetails";
import ModalOption from "enum/modalOptionTypes";
import { useModal } from "hooks/modal/ModalProvider";
import { IWishListPost } from "interface/wish/IWishListPost";
import { useEffect, useRef, useState } from "react";

interface WishListPostGridProps {
  wishListId: number;
  wishListName: string;
}

const WishListPostGrid = ({
  wishListId,
  wishListName,
}: WishListPostGridProps) => {
  const { openModal } = useModal();
  const [wishListPosts, setWishlistPosts] = useState<IWishListPost[]>([]);
  const [hasNext, setHasNext] = useState<boolean>(true);
  const [page, setPage] = useState(1);
  const observer = useRef<IntersectionObserver>();
  const lastPost = useRef(null); // 감시할 요소의 ref
  const fetchWishList = async () => {
    const data = await getWishListDetails(wishListId, page, 4);
    if (data) {
      if (data.hasNext) {
        setPage((prev) => prev + 1);
      } else {
        setHasNext(false);
      }
      // 현재 WishlistPosts 상태에서 모든 포스트 ID를 추출하여 Set 객체 생성
      const currentPostIds = new Set(wishListPosts.map((post) => post.postId));
      // 새로운 포스트 중 현재 상태에 없는 포스트만 필터링
      const newPosts = data.posts.filter(
        (post) => !currentPostIds.has(post.postId)
      );
      // 필터링된 새 포스트를 기존 포스트 배열에 추가
      setWishlistPosts((prev) => [...prev, ...newPosts]);
    }
  };
  // 위시리스트 ID가 변경되었을 때 포스트 목록 초기화
  useEffect(() => {
    setWishlistPosts([]);
    setPage(1);
    setHasNext(true);
    // eslint-disable-next-line
  }, [wishListId]);

  useEffect(
    () => {
      fetchWishList();
    },
    // eslint-disable-next-line
    []
  );

  useEffect(() => {
    observer.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNext) {
          fetchWishList();
        }
      },
      { threshold: 0.1 }
    );

    if (lastPost.current) {
      observer.current.observe(lastPost.current);
    }

    return () => observer.current?.disconnect();
    // eslint-disable-next-line
  }, [wishListPosts, hasNext]);

  const handleDeleteWishList = () => {
    openModal(ModalOption.DELETE_WARNING, {
      type: "wishList",
      targetId: wishListId,
    });
  };

  return (
    <div className={gridStyles.grid}>
      <div className={gridStyles.header}>
        <h1>{wishListName}</h1>
        <span
          className={gridStyles.removeButton}
          onClick={handleDeleteWishList}
        >
          위시리스트 삭제
        </span>
      </div>
      <div className={gridStyles.gridGallery}>
        {wishListPosts.map((post, index) => (
          <WishListPostCard
            key={index}
            postId={post.postId}
            thumbnailImg={post.thumbnailImage}
            title={post.title}
          />
        ))}
        <div ref={lastPost} />
      </div>
    </div>
  );
};

export default WishListPostGrid;
