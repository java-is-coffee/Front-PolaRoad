import { PayloadAction, createSlice } from "@reduxjs/toolkit";

// 초기 상태의 타입 정의
interface modalActive {
  isActive: boolean;
}

// 초기 상태
const initialState: modalActive = {
  isActive: false,
};

const newPostModal = createSlice({
  name: "ideOption",
  initialState,
  reducers: {
    activeNewPostModal: (state) => {
      state.isActive = true;
    },
    closeNewPostModal: (state) => {
      state.isActive = false;
    },
  },
});

// 액션 생성자와 리듀서 내보내기
export const { activeNewPostModal, closeNewPostModal } = newPostModal.actions;
export default newPostModal.reducer;
