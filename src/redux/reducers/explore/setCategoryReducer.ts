import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import CategoryType from "../../../enum/categoryOptionType";

// 초기 상태의 타입 정의
interface ActiveCategory {
  activeCategory: CategoryType | null;
}

// 초기 상태
const initialState: ActiveCategory = {
  activeCategory: null,
};

const setCategory = createSlice({
  name: "Category",
  initialState,
  reducers: {
    switchCategory: (state, action: PayloadAction<CategoryType | null>) => {
      state.activeCategory = action.payload;
    },
  },
});

// 액션 생성자와 리듀서 내보내기
export const { switchCategory } = setCategory.actions;
export default setCategory.reducer;
