import { useDispatch, useSelector } from "react-redux";

import { PayloadAction } from "@reduxjs/toolkit";
import getPostList from "api/explore/getPostList";
import {
  addExplorePostList,
  setExplorePostList,
} from "../../redux/reducers/explore/explorePostReducer";
import { GetListDTO } from "interface/explore/ExplorePost";
import { RootState } from "redux/store/store";

const useExploreHooks = () => {
  const dispatch = useDispatch();

  const storePostList = useSelector(
    (state: RootState) => state.explorePost.postList
  );

  //모든 페이로드 액션 테스트
  const SetItem = (action: PayloadAction<any>) => {
    dispatch(action);
  };

  const setPostList = async (inputDTO: GetListDTO) => {
    const result = await getPostList(inputDTO);

    dispatch(setExplorePostList(result));
  };

  const addPostList = async (inputDTO: GetListDTO) => {
    const result = await getPostList(inputDTO);

    dispatch(addExplorePostList(result));
  };

  return { SetItem, setPostList, addPostList };
};

export default useExploreHooks;
