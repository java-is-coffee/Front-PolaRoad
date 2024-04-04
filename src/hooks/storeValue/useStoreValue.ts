import { PayloadAction } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import {
  switchConcept,
  switchRegion,
  switchSort,
} from "../../redux/reducers/explore/filterReducer";
import { RootState } from "redux/store/store";
import { setExplorePostList } from "../../redux/reducers/explore/explorePostReducer";

const useStoreValue = () => {
  const dispatch = useDispatch();

  const storePostList = useSelector(
    (state: RootState) => state.explorePost.postList
  );

  const storeEndPoint = useSelector(
    (state: RootState) => state.explorePost.endPoint
  );

  const storeConcept = useSelector(
    (state: RootState) => state.filter.activeConcept
  );
  const storeRegion = useSelector(
    (state: RootState) => state.filter.activeRegion
  );
  const storeSort = useSelector((state: RootState) => state.filter.activeSort);
  const storeCurPage = useSelector(
    (state: RootState) => state.explorePost.curPage
  );

  const storeSearchText = useSelector(
    (state: RootState) => state.filter.searchText
  );

  const isMobileSearchFilter = useSelector(
    (state: RootState) => state.exploreMobileSetting.isMobileSearchFilter
  );

  const setValue = (action: PayloadAction<any>) => {
    dispatch(action);
  };

  const resetValue = () => {
    dispatch(switchRegion(null));
    dispatch(switchSort(null));
    dispatch(switchConcept(null));
    dispatch(setExplorePostList(null));
  };

  return {
    storePostList,
    storeEndPoint,
    storeConcept,
    storeRegion,
    storeSort,
    storeCurPage,
    storeSearchText,
    isMobileSearchFilter,
    setValue,
    resetValue,
  };
};

export default useStoreValue;
