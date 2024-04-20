import { useDispatch } from "react-redux";

import { PayloadAction } from "@reduxjs/toolkit";
import getPostList from "api/explore/getPostList";
import {
  addExplorePostList,
  setCurPage,
  setEndPoint,
  setExplorePostList,
} from "../../redux/reducers/explore/explorePostReducer";
import { GetFollowListDTO, GetListDTO } from "interface/explore/ExplorePost";
import getFollwerPostList from "api/explore/getFollwerPostList";

const useExploreHooks = () => {
  const dispatch = useDispatch();

  //모든 페이로드 액션 테스트
  const setItem = (action: PayloadAction<any>) => {
    dispatch(action);
  };

  const setPostList = async (inputDTO: GetListDTO) => {
    const result = await getPostList(inputDTO);

    if (result !== null) {
      dispatch(setExplorePostList(result.posts));
      dispatch(setCurPage(1));
      dispatch(setEndPoint(false));
    }
  };

  const setFollowPostList = async (inputDTO: GetFollowListDTO) => {
    if (inputDTO.paging === 1) {
      const result = await getFollwerPostList(inputDTO);
      dispatch(setExplorePostList(result.posts));
      dispatch(setCurPage(inputDTO.paging));
      dispatch(setEndPoint(false));
    } else {
      const result = await getFollwerPostList(inputDTO);
      if (result === null) {
        dispatch(addExplorePostList(result.posts));
        return 0;
      } else {
        dispatch(addExplorePostList(result.posts));
        return 1;
      }
    }
  };

  const addPostList = async (inputDTO: GetListDTO) => {
    const result = await getPostList(inputDTO);
    if (result.hasNext === false) {
      dispatch(addExplorePostList(result.posts));
      return 0;
    } else {
      dispatch(addExplorePostList(result.posts));
    }
  };

  return { setItem, setPostList, addPostList, setFollowPostList };
};

export default useExploreHooks;
