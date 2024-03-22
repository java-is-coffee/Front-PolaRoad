import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import INewPost from "../../../interface/post/INewPost";
import conceptOptionType from "../../../enum/post/conceptOptionType";
import regionOptionType from "../../../enum/post/regionOptionType";
import INewCard from "interface/card/INewCard";
import uuid from "react-uuid";

const initCard: INewCard = {
  cardId: "",
  cardIndex: null,
  location: null,
  latitude: null,
  longitude: null,
  image: undefined,
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

function getEnumKeyByEnumValue<T extends { [index: string]: string }>(
  myEnum: T,
  enumValue: string
): string | null {
  let keys = Object.keys(myEnum).filter((x) => myEnum[x] === enumValue);
  return keys.length > 0 ? keys[0] : null;
}

const newPost = createSlice({
  name: "newPost",
  initialState,
  reducers: {
    setPostId: (state) => {
      state.postId = uuid();
    },
    setTitle: (state, action: PayloadAction<string>) => {
      state.postDetail.title = action.payload;
    },
    setConcept: (state, action: PayloadAction<conceptOptionType>) => {
      const conceptKey = getEnumKeyByEnumValue(
        conceptOptionType,
        action.payload
      );
      state.postDetail.concept = conceptKey;
    },
    setRegion: (state, action: PayloadAction<regionOptionType>) => {
      const regionKey = getEnumKeyByEnumValue(regionOptionType, action.payload);
      state.postDetail.region = regionKey;
    },
    setThumbnail: (state, action: PayloadAction<number>) => {
      state.postDetail.thumbnailIndex = action.payload;
    },
    setRoutePoint: (state) => {
      const routePointDate = state.postDetail.cards
        .filter((card) => card.latitude && card.longitude)
        .map((card) => ({
          latitude: card.latitude,
          longitude: card.longitude,
        }));
      state.postDetail.routePoint = JSON.stringify(routePointDate);
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
        (card) => card.image
      );
    },
    removeCardByIndex: (state, action: PayloadAction<number>) => {
      state.postDetail.cards = state.postDetail.cards.filter(
        (card, index) => index !== action.payload
      );
    },
    addCardFront: (state) => {
      state.postDetail.cards.unshift({ ...initCard, cardId: uuid() });
    },
    addCardBack: (state) => {
      state.postDetail.cards.push({ ...initCard, cardId: uuid() });
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
  setTitle,
  setConcept,
  setThumbnail,
  setRegion,
  setRoutePoint,
  updateCardAtIndex,
  filterCardNoneImage,
  removeCardByIndex,
  addCardFront,
  addCardBack,
  addHashTags,
  removeHashTags,
  resetPostDetails,
} = newPost.actions;
export default newPost.reducer;
