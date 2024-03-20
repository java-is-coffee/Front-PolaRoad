import { useDispatch } from "react-redux";

import { PayloadAction } from "@reduxjs/toolkit";
import getPostList from "api/explore/getPostList";
import { GetListDTO } from "../../api/explore/getPostList";
import { setExplorePostList } from "../../redux/reducers/explore/explorePostReducer";

const useExploreHooks = () => {
  const dispatch = useDispatch();

  //모든 페이로드 액션 테스트
  const SetItem = (action: PayloadAction<any>) => {
    console.log("테스트 + " + action.payload);
    dispatch(action);
  };

  const initList = async (inputDTO: GetListDTO) => {
    console.log(inputDTO);
    const result = await getPostList(inputDTO);

    dispatch(setExplorePostList(result));
  };

  return { SetItem, initList };
};

export default useExploreHooks;
