import { createSlice } from "@reduxjs/toolkit";
import INewPost from "../../../interface/post/INewPost";

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
    setPostDetails: (state, PayloadAction) => {},
  },
});

// 액션 생성자와 리듀서 내보내기
export const { setPostDetails } = newPost.actions;
export default newPost.reducer;
