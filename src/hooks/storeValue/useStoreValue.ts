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
  const storeCurPage = useSelector(
    (state: RootState) => state.explorePost.curPage
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
    storeCurPage,
    isMobileSearchFilter,
    setValue,
  };
};

export default useStoreValue;
