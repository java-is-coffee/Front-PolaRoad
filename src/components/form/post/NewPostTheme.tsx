import conceptOptionType from "../../../enum/post/conceptOptionType";
import regionOptionType from "../../../enum/post/regionOptionType";

import formStyles from "./NewPostTheme.module.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store/store";
import {
  setConcept,
  setRegion,
} from "../../../redux/reducers/newPost/newPostReducers";

function NewPostTheme() {
  const selectedConcept = useSelector(
    (state: RootState) => state.newPost.postDetail.concept
  );
  const selectedRegion = useSelector(
    (state: RootState) => state.newPost.postDetail.region
  );
  const dispatch = useDispatch();

  const handleSelection = (option: conceptOptionType) => {
    dispatch(setConcept(option));
  };

  const handleSelectRegion = (option: regionOptionType) => {
    dispatch(setRegion(option));
  };

  return (
    <div className={formStyles.formWrapper}>
      <div className={formStyles.label}>여행 테마 선택</div>
      <div className={formStyles.optionList}>
        {Object.entries(conceptOptionType).map(([key, value]) => (
          <button
            className={
              selectedConcept === key
                ? formStyles.selectedOptionBtn
                : formStyles.optionBtn
            }
            key={key}
            onClick={() => handleSelection(value as conceptOptionType)}
          >
            {value}
          </button>
        ))}
      </div>
      <div className={formStyles.label}>지역을 선택해주세요</div>
      <div className={formStyles.optionList}>
        {Object.entries(regionOptionType).map(([key, value]) => (
          <button
            className={
              selectedRegion === key
                ? formStyles.selectedOptionBtn
                : formStyles.optionBtn
            }
            key={key}
            onClick={() => handleSelectRegion(value as regionOptionType)}
          >
            {value}
          </button>
        ))}
      </div>
    </div>
  );
}

export default NewPostTheme;
