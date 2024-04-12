import gridStyles from "./WishListPostGrid.module.css";
import getWishListDetails from "api/wishlist/getWishListDetails";
import ModalOption from "enum/modalOptionTypes";
import { useModal } from "hooks/modal/ModalProvider";
import { useEffect } from "react";

interface WishListPostGridProps {
  wishListId: number;
  wishListName: string;
}

const WishListPostGrid = ({
  wishListId,
  wishListName,
}: WishListPostGridProps) => {
  const { openModal } = useModal();
  useEffect(
    () => {
      const fetchWishList = async () => {
        const data = await getWishListDetails(wishListId, 1, 12);
        console.log(data);
      };
      fetchWishList();
    },
    // eslint-disable-next-line
    []
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
    </div>
  );
};

export default WishListPostGrid;
