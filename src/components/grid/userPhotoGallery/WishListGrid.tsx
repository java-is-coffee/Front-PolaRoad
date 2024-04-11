import getWishList from "api/wishlist/getWishList";
import WishListThumbnailCard from "components/card/wishList/WishListThumbnailCard";
import { IWishListDTO } from "interface/wish/IWishList";
import { useEffect, useState } from "react";

const WishListGrid = () => {
  const [wishList, setWishList] = useState<IWishListDTO[]>([]);
  useEffect(
    () => {
      const fetchWishList = async () => {
        const data = await getWishList();
        if (data) setWishList(data);
        console.log(data);
      };
      fetchWishList();
    },
    // eslint-disable-next-line
    []
  );
  return (
    <div>
      {wishList.map((wishList) => (
        <WishListThumbnailCard
          key={wishList.wishListId}
          wishListId={wishList.wishListId}
          name={wishList.name}
        />
      ))}
    </div>
  );
};
export default WishListGrid;
