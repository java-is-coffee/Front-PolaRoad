import { useEffect } from "react";
import ModalOption from "../../../enum/modalOptionTypes";
import { useModal } from "../../../hooks/modal/ModalProvider";
import dropdownStyles from "./SearchDropdown.module.css";
import CategoryType from "../../../enum/categoryOptionType";
import RegionOptionType from "../../../enum/filter/RegionType";
import SortOptionType from "../../../enum/filter/SortOptionType";
import useExploreHooks from "../../../hooks/explore/useExploreHooks";
import { RootState } from "../../../redux/store/store";
import { useSelector } from "react-redux";
import {
  switchCategory,
  switchRegion,
  switchSort,
} from "../../../redux/reducers/explore/filterReducer";

function SearchDropdown() {
  const { closeModal } = useModal();

  const sortList = Object.values(SortOptionType);
  const categoryList = Object.values(CategoryType);
  const regionList = Object.values(RegionOptionType);

  // const FormComponent = formComponents[postFormIndex];
  // Esc 눌렀을때 모달 탈출
  const handleKeyUp = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      closeModal(ModalOption.SEARCH);
    }
  };
  // 모달 바깥쪽 눌렀을떄 모달 탈출
  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      closeModal(ModalOption.SEARCH);
    }
  };
  // 컴포넌트 랜더링시에 한번만 리스너 추가
  useEffect(() => {
    document.addEventListener("keyup", handleKeyUp);
    return () => {
      document.removeEventListener("keyup", handleKeyUp);
    };
    // eslint-disable-next-line
  }, []);

  const { SetItem } = useExploreHooks();

  const storeSort = useSelector((state: RootState) => state.filter.activeSort);
  const storeCategory = useSelector(
    (state: RootState) => state.filter.activeCategory
  );
  const storeRegion = useSelector(
    (state: RootState) => state.filter.activeRegion
  );

  const handleClick = (inputData: any, aboutFilter: string) => {
    if (aboutFilter === "정렬") {
      if (inputData === storeSort) {
        SetItem(switchSort(null));
      } else {
        SetItem(switchSort(inputData));
      }
    }
    if (aboutFilter === "카테고리") {
      if (inputData === storeCategory) {
        SetItem(switchCategory(null));
      } else {
        SetItem(switchCategory(inputData));
      }
    }
    if (aboutFilter === "지역") {
      if (inputData === storeRegion) {
        SetItem(switchRegion(null));
      } else {
        SetItem(switchRegion(inputData));
      }
    }
  };

  return (
    <div className={dropdownStyles.outSide} onClick={handleBackdropClick}>
      <div className={dropdownStyles.wrapper}>
        {/* 정렬 및 첫 줄 */}
        <div className={dropdownStyles.head}>필터</div>
        <div className={dropdownStyles.line}></div>

        {/* 정렬  */}
        <div className={dropdownStyles.option}>
          <div className={dropdownStyles.title}>정렬</div>
          <div className={dropdownStyles.list}>
            {sortList.map((item) => (
              <div
                className={`${dropdownStyles.item} ${
                  storeSort === item ? dropdownStyles.selected : ""
                }`}
                key={item}
                onClick={() => handleClick(item, "정렬")}
              >
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 구분선 */}
        <div className={dropdownStyles.line}></div>

        <div className={dropdownStyles.option}>
          <div className={dropdownStyles.title}>카테고리</div>
          <div className={dropdownStyles.list}>
            {categoryList.map((item) => (
              <div
                className={`${dropdownStyles.item} ${
                  storeCategory === item ? dropdownStyles.selected : ""
                }`}
                key={item}
                onClick={() => handleClick(item, "카테고리")}
              >
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 구분선 */}
        <div className={dropdownStyles.line}></div>
        <div className={dropdownStyles.option}>
          <div className={dropdownStyles.title}>지역</div>
          <div className={dropdownStyles.list}>
            {regionList.map((item) => (
              <div
                className={`${dropdownStyles.item} ${
                  storeRegion === item ? dropdownStyles.selected : ""
                }`}
                key={item}
                onClick={() => handleClick(item, "지역")}
              >
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchDropdown;
