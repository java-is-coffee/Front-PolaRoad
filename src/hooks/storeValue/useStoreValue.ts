import { PayloadAction } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "redux/store/store";

const useStoreValue = () => {
  const dispatch = useDispatch();

  const storePostList = useSelector(
    (state: RootState) => state.explorePost.postList
  );

  const storeEndPoint = useSelector(
    (state: RootState) => state.explorePost.endPoint
  );

  const storeCategory = useSelector(
    (state: RootState) => state.filter.activeCategory
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

  const setValue = (action: PayloadAction<any>) => {
    dispatch(action);
  };

  return {
    storePostList,
    storeEndPoint,
    storeCategory,
    storeRegion,
    storeSort,
    storeCurPage,
    storeSearchText,
    setValue,
  };
};

export default useStoreValue;
