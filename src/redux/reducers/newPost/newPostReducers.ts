import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import INewPost from "../../../interface/post/INewPost";
import conceptOptionType from "../../../enum/post/conceptOptionType";
import regionOptionType from "../../../enum/post/regionOptionType";

const initialState: INewPost = {
  title: null,
  routePoint: null,
  thumbnailIndex: null,
  concept: null,
  region: null,
  cards: null,
  hashtags: null,
};

const newPost = createSlice({
  name: "newPost",
  initialState,
  reducers: {
    setConcept: (state, action: PayloadAction<conceptOptionType>) => {
      state.concept = action.payload;
    },
    setRegion: (state, action: PayloadAction<regionOptionType>) => {
      state.region = action.payload;
    },
    resetPostDetails: (state) => {
      return initialState;
    },
  },
});

// 액션 생성자와 리듀서 내보내기
export const { setConcept, setRegion, resetPostDetails } = newPost.actions;
export default newPost.reducer;
