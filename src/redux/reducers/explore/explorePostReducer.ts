import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PostData } from "interface/explore/ExplorePost";

// 초기 상태의 타입 정의
//postList : 포스트 리스트 목록
//curPage : 무한 스크롤에서 사용되는 페이지 (1부터 시작해서 가능한 수만큼 증가)
//endPoint : 무한 스크롤 끝에 도달하였을때, 종료되는 시점 응답으로 넘어온 포스트 리스트의 배열 크기가 0일 경우 true로 활성화
//
interface postList {
  postList: PostData[] | null;
  curPage: number;
  endPoint: boolean;
  isMobileSearch: boolean;
}

// 초기 상태
const initialState: postList = {
  postList: null,
  curPage: 1,
  endPoint: false,
  isMobileSearch: false,
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
    setIsMobileSearch: (state, action: PayloadAction<boolean>) => {
      state.isMobileSearch = action.payload;
    },
  },
});

// 액션 생성자와 리듀서 내보내기
export const {
  setExplorePostList,
  addExplorePostList,
  setCurPage,
  setEndPoint,
  setIsMobileSearch,
} = explorePost.actions;

export default explorePost.reducer;
