import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PostData } from "interface/explore/ExplorePost";

// 초기 상태의 타입 정의
interface postList {
  postList: PostData[] | null;
  curPage: number;
  endPoint: boolean;
}

// 초기 상태
const initialState: postList = {
  postList: null,
  curPage: 1,
  endPoint: false,
};

const explorePost = createSlice({
  name: "explorePost",
  initialState,
  reducers: {
    setExplorePostList: (state, action: PayloadAction<PostData[] | null>) => {
      state.postList = action.payload;
    },
    addExplorePostList: (state, action: PayloadAction<PostData[] | null>) => {
      if (state.postList && action.payload)
        state.postList = state.postList?.concat(action.payload);
    },
    setCurPage: (state, action: PayloadAction<number>) => {
      state.curPage = action.payload;
    },
    setEndPoint: (state, action: PayloadAction<boolean>) => {
      state.endPoint = action.payload;
    },
  },
});

// 액션 생성자와 리듀서 내보내기
export const {
  setExplorePostList,
  addExplorePostList,
  setCurPage,
  setEndPoint,
} = explorePost.actions;
export default explorePost.reducer;
