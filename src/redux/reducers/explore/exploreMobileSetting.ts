import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// 초기 상태의 타입 정의
//postList : 포스트 리스트 목록
//curPage : 무한 스크롤에서 사용되는 페이지 (1부터 시작해서 가능한 수만큼 증가)
//endPoint : 무한 스크롤 끝에 도달하였을때, 종료되는 시점 응답으로 넘어온 포스트 리스트의 배열 크기가 0일 경우 true로 활성화
//
interface ExploreMobileSetting {
  isMobileSearchFilter: boolean;
  isMobileSearchInput: boolean;
}

// 초기 상태
//searchFilter = 서치 필터 창 상태
//searchInput = 서치 최근 검색어 창 상태
const initialState: ExploreMobileSetting = {
  isMobileSearchFilter: false,
  isMobileSearchInput: false,
};

const exploreMobileSetting = createSlice({
  name: "exploreMobileSetting",
  initialState,
  reducers: {
    setIsMobileSearchFilter: (state, action: PayloadAction<boolean>) => {
      state.isMobileSearchFilter = action.payload;
    },
    setIsMobileSearchInput: (state, action: PayloadAction<boolean>) => {
      state.isMobileSearchInput = action.payload;
    },
  },
});

// 액션 생성자와 리듀서 내보내기
export const { setIsMobileSearchFilter, setIsMobileSearchInput } =
  exploreMobileSetting.actions;

export default exploreMobileSetting.reducer;
