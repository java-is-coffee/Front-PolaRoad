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
  };
};

export default useStoreValue;
