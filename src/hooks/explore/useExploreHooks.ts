import { useDispatch } from "react-redux";

import { PayloadAction } from "@reduxjs/toolkit";
import getPostList from "api/explore/getPostList";
import {
  addExplorePostList,
  setExplorePostList,
} from "../../redux/reducers/explore/explorePostReducer";
import { GetListDTO } from "interface/explore/ExplorePost";

const useExploreHooks = () => {
  const dispatch = useDispatch();

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

    // console.log(result);
    if (result.length === 0) {
      console.log("끝");
      return 0;
    } else {
      dispatch(addExplorePostList(result));
      return 1;
    }
  };

  return { SetItem, setPostList, addPostList };
};

export default useExploreHooks;
