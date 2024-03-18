import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import CategoryType from "../../../enum/categoryOptionType";
import SortOptionType from "../../../enum/filter/SortOptionType";
import { RegionType } from "aws-sdk/clients/directoryservice";

// 초기 상태의 타입 정의
interface filterList {
  activeSort: SortOptionType | null;
  activeCategory: CategoryType | null;
  activeRegion: RegionType | null;
}

// 초기 상태
const initialState: filterList = {
  activeSort: null,
  activeCategory: null,
  activeRegion: null,
};

const filter = createSlice({
  name: "filter",
  initialState,
  reducers: {
    switchSort: (state, action: PayloadAction<SortOptionType | null>) => {
      state.activeSort = action.payload;
    },
    switchCategory: (state, action: PayloadAction<CategoryType | null>) => {
      state.activeCategory = action.payload;
    },
    switchRegion: (state, action: PayloadAction<RegionType | null>) => {
      state.activeRegion = action.payload;
    },
  },
});

// 액션 생성자와 리듀서 내보내기
export const { switchSort, switchCategory, switchRegion } = filter.actions;
export default filter.reducer;
