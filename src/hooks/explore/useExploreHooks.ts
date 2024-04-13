import { useDispatch } from "react-redux";

import { PayloadAction } from "@reduxjs/toolkit";
import getPostList from "api/explore/getPostList";
import {
  addExplorePostList,
  setCurPage,
  setEndPoint,
  setExplorePostList,
} from "../../redux/reducers/explore/explorePostReducer";
import { GetListDTO } from "interface/explore/ExplorePost";

const useExploreHooks = () => {
  const dispatch = useDispatch();

  //모든 페이로드 액션 테스트
  const setItem = (action: PayloadAction<any>) => {
    dispatch(action);
  };

  const setPostList = async (inputDTO: GetListDTO) => {
    const result = await getPostList(inputDTO);
    dispatch(setExplorePostList(result.posts));
    dispatch(setCurPage(1));
    dispatch(setEndPoint(false));
  };

  const addPostList = async (inputDTO: GetListDTO) => {
    const result = await getPostList(inputDTO);

    if (result.hasNext === false) {
      dispatch(addExplorePostList(result.posts));
      console.log("끝");
      return 0;
    } else {
      dispatch(addExplorePostList(result.posts));
      return 1;
    }
  };

  return { setItem, setPostList, addPostList };
};

export default useExploreHooks;
