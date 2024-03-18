import { useDispatch, useSelector } from "react-redux";

import { PayloadAction } from "@reduxjs/toolkit";
import getPostList from "api/explore/getPostList";
import { GetListDTO } from "../../api/explore/getPostList";
import { setExplorePostList } from "../../redux/reducers/explore/explorePostReducer";
import { RootState } from "redux/store/store";

const useExploreHooks = () => {
  const dispatch = useDispatch();
  const postList = useSelector(
    (state: RootState) => state.explorePost.postList
  );

  //모든 페이로드 액션 테스트
  const SetItem = (action: PayloadAction<any>) => {
    console.log("테스트 + " + action.payload);
    dispatch(action);
  };

  const initList = async (inputDTO: GetListDTO) => {
    const result = await getPostList(inputDTO);

    dispatch(setExplorePostList(result));
    console.log("통신테스트x");
    console.log(postList);
  };

  return { SetItem, initList };
};

export default useExploreHooks;
