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
  const [wishList, setWishList] = useState<IWishListPost[]>([]);
  const [hasNext, setHasNext] = useState<boolean>(true);
  const lastPost = useRef(null); // 감시할 요소의 ref
  useEffect(
    () => {
      const fetchWishList = async () => {
        const data = await getWishListDetails(wishListId, 1, 12);
        if (data) {
          setWishList(data.posts);
          setHasNext(data.hasNext);
        }
      };
      fetchWishList();
    },
    // eslint-disable-next-line
    [wishListId, wishListName]
  );

  const handleDeleteWishList = () => {
    console.log(wishListId);
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
        {wishList.map((post, index) => (
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
