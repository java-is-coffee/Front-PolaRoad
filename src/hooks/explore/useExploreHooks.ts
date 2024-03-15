import { useDispatch } from "react-redux";

import { PayloadAction } from "@reduxjs/toolkit";

const useExploreHooks = () => {
  const dispatch = useDispatch();

  // const test: PayloadAction = switchCategory(CategoryType.NULL);

  // const storeCategory = useSelector(
  //   (state: RootState) => state.setCategory.activeCategory
  // );

  //카테고리 1개 테스트
  // const SetCategory = (inputCategory: CategoryType) => {
  //   if (storeCategory === inputCategory)
  //     dispatch(switchCategory(CategoryType.NULL));
  //   else dispatch(switchCategory(inputCategory));
  // };

  //모든 페이로드 액션 테스트
  const SetItem = (action: PayloadAction<any>) => {
    console.log("테스트 + " + action.payload);
    dispatch(action);
  };

  return { SetItem };
};

export default useExploreHooks;
