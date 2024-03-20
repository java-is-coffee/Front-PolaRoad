import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PostData } from "api/explore/getPostList";

// 초기 상태의 타입 정의
interface postList {
  postList: PostData[] | null;
}

// 초기 상태
const initialState: postList = {
  postList: null,
};

const explorePost = createSlice({
  name: "explorePost",
  initialState,
  reducers: {
    setExplorePostList: (state, action: PayloadAction<PostData[] | null>) => {
      state.postList = action.payload;
    },
  },
});

// 액션 생성자와 리듀서 내보내기
export const { setExplorePostList } = explorePost.actions;
export default explorePost.reducer;
