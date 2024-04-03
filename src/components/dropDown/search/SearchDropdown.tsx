import { useEffect, useMemo } from "react";
import ModalOption from "../../../enum/modalOptionTypes";
import { useModal } from "../../../hooks/modal/ModalProvider";
import dropdownStyles from "./SearchDropdown.module.css";
import CategoryType from "../../../enum/ConceptOptionType";
import RegionOptionType from "../../../enum/filter/RegionType";
import SortOptionType from "../../../enum/filter/SortOptionType";
import useExploreHooks from "../../../hooks/explore/useExploreHooks";

import {
  switchConcept,
  switchRegion,
  switchSort,
} from "../../../redux/reducers/explore/filterReducer";
import { Button } from "@mui/material";
import { GetListDTO } from "interface/explore/ExplorePost";
import useStoreValue from "hooks/storeValue/useStoreValue";

function SearchDropdown() {
  const { closeModal } = useModal();
  const { setPostList } = useExploreHooks();
  const { SetItem } = useExploreHooks();
  const { storeSort, storeConcept, storeRegion } = useStoreValue();

  const { sortSet, categorySet, regionSet } = useMemo(
    () => ({
      sortSet: {
        key: Object.keys(SortOptionType),
        values: Object.values(SortOptionType),
      },
      categorySet: {
        key: Object.keys(CategoryType),
        values: Object.values(CategoryType),
      },
      regionSet: {
        key: Object.keys(RegionOptionType),
        values: Object.values(RegionOptionType),
      },
    }),
    []
  );

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

  const handleClick = (inputData: any, aboutFilter: string) => {
    if (aboutFilter === "정렬") {
      if (inputData === storeSort) {
        SetItem(switchSort(null));
      } else {
        SetItem(switchSort(inputData));
      }
    }
    if (aboutFilter === "카테고리") {
      if (inputData === storeConcept) {
        SetItem(switchConcept(null));
      } else {
        SetItem(switchConcept(inputData));
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

  const handleSubmit = () => {
    const sortNumber = storeSort ? sortSet.values.indexOf(storeSort) : null;
    const categoryNumber = storeConcept
      ? categorySet.values.indexOf(storeConcept)
      : null;
    const regionNumber = storeRegion
      ? regionSet.values.indexOf(storeRegion)
      : null;

    const setCategoyList: GetListDTO = {
      paging: 1,
      pagingNumber: 8,
      searchType: "KEYWORD",
      keyword: null,
      sortBy: sortNumber !== null ? sortSet.key[sortNumber] : "RECENT",
      concept: categoryNumber !== null ? categorySet.key[categoryNumber] : null,
      region: regionNumber !== null ? regionSet.key[regionNumber] : null,
    };

    setPostList(setCategoyList);
    closeModal(ModalOption.SEARCH);
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
            {sortSet.values.map((item) => (
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
            {categorySet.values.map((item) => (
              <div
                className={`${dropdownStyles.item} ${
                  storeConcept === item ? dropdownStyles.selected : ""
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
            {regionSet.values.map((item) => (
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

        <div className={dropdownStyles.bottomBtn}>
          <Button
            variant="contained"
            sx={{
              fontSize: "1.5rem",
              backgroundColor: "#13c4a3",
              ":hover": { backgroundColor: "#13c4a3", fontSize: "1.5rem" },
            }}
            onClick={handleSubmit}
          >
            적용하기
          </Button>
        </div>
      </div>
    </div>
  );
}

export default SearchDropdown;
