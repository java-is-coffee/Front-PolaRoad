import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IWishListDTO } from "interface/wish/IWishList";

const initialState: IWishListDTO[] = [];

const wishList = createSlice({
  name: "wishList",
  initialState,
  reducers: {
    setWishLists: (state, action: PayloadAction<IWishListDTO[]>) => {
      return (state = action.payload);
    },
    removeWishListById: (state, action: PayloadAction<number>) => {
      return state.filter((wishList) => wishList.wishListId !== action.payload);
    },
  },
});

// 액션 생성자와 리듀서 내보내기
export const { setWishLists, removeWishListById } = wishList.actions;
export default wishList.reducer;
