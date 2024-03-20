import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import INewPost from "../../../interface/post/INewPost";
import conceptOptionType from "../../../enum/post/conceptOptionType";
import regionOptionType from "../../../enum/post/regionOptionType";
import INewCard from "interface/card/INewCard";
import uuid from "react-uuid";

const initCard: INewCard = {
  cardIndex: null,
  location: null,
  latitude: null,
  longitude: null,
  imageUrl: undefined,
  content: null,
};

interface PostDetailType {
  postId: string | null;
  postDetail: INewPost;
}

const initialState: PostDetailType = {
  postId: null,
  postDetail: {
    title: null,
    routePoint: null,
    thumbnailIndex: null,
    concept: null,
    region: null,
    cards: [initCard],
    hashtags: [],
  },
};

const newPost = createSlice({
  name: "newPost",
  initialState,
  reducers: {
    setPostId: (state) => {
      state.postId = uuid();
      console.log(state.postId);
    },
    setConcept: (state, action: PayloadAction<conceptOptionType>) => {
      state.postDetail.concept = action.payload;
    },
    setRegion: (state, action: PayloadAction<regionOptionType>) => {
      state.postDetail.region = action.payload;
    },
    updateCardAtIndex: (
      state,
      action: PayloadAction<{ index: number; newCard: INewCard }>
    ) => {
      const { index, newCard } = action.payload;
      if (index >= 0 && index < state.postDetail.cards.length) {
        state.postDetail.cards[index] = {
          ...state.postDetail.cards[index],
          ...newCard,
        };
      }
    },
    filterCardNoneImage: (state) => {
      state.postDetail.cards = state.postDetail.cards.filter(
        (card) => card.imageUrl
      );
    },
    addCardFront: (state) => {
      state.postDetail.cards.unshift({ ...initCard });
    },
    addCardBack: (state) => {
      state.postDetail.cards.push({ ...initCard });
    },
    addHashTags: (state, action: PayloadAction<string>) => {
      state.postDetail.hashtags.push(action.payload);
    },
    removeHashTags: (state, action: PayloadAction<string>) => {
      state.postDetail.hashtags = state.postDetail.hashtags.filter(
        (hashTag) => hashTag !== action.payload
      );
    },
    resetPostDetails: (state) => {
      return initialState;
    },
  },
});

// 액션 생성자와 리듀서 내보내기
export const {
  setPostId,
  setConcept,
  setRegion,
  updateCardAtIndex,
  filterCardNoneImage,
  addCardFront,
  addCardBack,
  addHashTags,
  removeHashTags,
  resetPostDetails,
} = newPost.actions;
export default newPost.reducer;
