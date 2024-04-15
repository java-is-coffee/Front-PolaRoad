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
  const [selectedWishListName, setSelectedWishListName] = useState<
    string | null
  >(null);
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
  const handleSelectWishList = (wishListId: number, wishListName: string) => {
    setSelectedWishListId(wishListId);
    setSelectedWishListName(wishListName);
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
            onClick={() =>
              handleSelectWishList(wishList.wishListId, wishList.name)
            }
          >
            <h2>{wishList.name}</h2>
          </div>
        ))}
      </div>
      {selectedWishListId && selectedWishListName ? (
        <WishListPostGrid
          wishListId={selectedWishListId}
          wishListName={selectedWishListName}
        />
      ) : (
        <div className={gridStyle.default}>
          <img src="/logo512.png" alt="로고" width={"150px"} />
          <span>위시리스트를 선택해주세요.</span>
        </div>
      )}
    </div>
  );
};
export default WishListGrid;
