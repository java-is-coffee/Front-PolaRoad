import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import SortOptionType from "../../../enum/filter/SortOptionType";
import RegionOptionType from "enum/filter/RegionType";
import RegionType from "enum/filter/RegionType";
import ConceptType from "../../../enum/ConceptOptionType";

// 초기 상태의 타입 정의
interface filterList {
  activeSort: SortOptionType | null;
  activeConcept: ConceptType | null;
  activeRegion: RegionType | null;
  searchText: string | null;
}

// 초기 상태
const initialState: filterList = {
  activeSort: null,
  activeConcept: null,
  activeRegion: null,
  searchText: null,
};

const filter = createSlice({
  name: "filter",
  initialState,
  reducers: {
    switchSort: (state, action: PayloadAction<SortOptionType | null>) => {
      state.activeSort = action.payload;
    },
    switchConcept: (state, action: PayloadAction<ConceptType | null>) => {
      state.activeConcept = action.payload;
    },
    switchRegion: (state, action: PayloadAction<RegionOptionType | null>) => {
      state.activeRegion = action.payload;
    },
    setSearchText: (state, action: PayloadAction<string | null>) => {
      state.searchText = action.payload;
    },
  },
});

// 액션 생성자와 리듀서 내보내기
export const { switchSort, switchConcept, switchRegion, setSearchText } =
  filter.actions;
export default filter.reducer;
