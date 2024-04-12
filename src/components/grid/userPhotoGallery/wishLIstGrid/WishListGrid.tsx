import gridStyle from "./WishListGrid.module.css";
import getWishList from "api/wishlist/getWishList";
import { IWishListDTO } from "interface/wish/IWishList";
import { useEffect, useState } from "react";
import WishListPostGrid from "../wishListPost/WishListPostGrid";

const WishListGrid = () => {
  const [wishList, setWishList] = useState<IWishListDTO[]>([]);
  const [selectedWishListId, setSelectedWishListId] = useState<number | null>(
    null
  );
  useEffect(
    () => {
      const fetchWishList = async () => {
        const data = await getWishList();
        if (data) setWishList(data);
      };
      fetchWishList();
    },
    // eslint-disable-next-line
    []
  );
  const handleSelectWishList = (wishListId: number) => {
    setSelectedWishListId(wishListId);
  };
  return (
    <div className={gridStyle.gridGallery}>
      <div className={gridStyle.sideBar}>
        {wishList.map((wishList) => (
          <div
            className={
              wishList.wishListId === selectedWishListId
                ? gridStyle.selectedWish
                : gridStyle.defaultWish
            }
            key={wishList.wishListId}
            onClick={() => handleSelectWishList(wishList.wishListId)}
          >
            <h2>{wishList.name}</h2>
          </div>
        ))}
      </div>
      <WishListPostGrid
        wishListId={selectedWishListId ? selectedWishListId : 0}
      />
    </div>
  );
};
export default WishListGrid;
