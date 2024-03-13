// store.ts
import { configureStore } from "@reduxjs/toolkit";
import newPostModalReducers from "../reducers/modal/newPostModalReducers";

export const store = configureStore({
  reducer: {
    newPostModal: newPostModalReducers,
  },
});

// RootState 타입을 정의하여, 스토어의 상태 타입을 추론할 수 있도록 합니다.
export type RootState = ReturnType<typeof store.getState>;

// AppDispatch 타입을 정의하여, 스토어의 dispatch 함수 타입을 설정합니다.
export type AppDispatch = typeof store.dispatch;
