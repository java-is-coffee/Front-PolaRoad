import { useEffect, useMemo } from "react";
import ModalOption from "../../../enum/modalOptionTypes";
import { useModal } from "../../../hooks/modal/ModalProvider";
import dropdownStyles from "./SearchDropdown.module.css";
import useExploreHooks from "../../../hooks/explore/useExploreHooks";

import {
  switchConcept,
  switchRegion,
  switchSort,
} from "../../../redux/reducers/explore/filterReducer";
import { Button } from "@mui/material";
import {
  conceptSet,
  GetListDTO,
  regionSet,
  sortSet,
} from "interface/explore/ExplorePost";
import useStoreValue from "hooks/storeValue/useStoreValue";
import { useSearchParams } from "react-router-dom";

function SearchDropdown() {
  const { closeModal } = useModal();
  const { setPostList } = useExploreHooks();
  const { SetItem } = useExploreHooks();
  const { storeSort, storeConcept, storeRegion } = useStoreValue();

  const [query, setQuery] = useSearchParams();

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
    if (aboutFilter === "sort") {
      const savedData = query.get("sort");
      const number = sortSet.values.indexOf(inputData);
      if (sortSet.key[number] === savedData) {
        query.delete("sort");
        setQuery(query);
      } else {
        query.set("sort", sortSet.key[number]);
        setQuery(query);
      }
    }
    if (aboutFilter === "concept") {
      const savedData = query.get("concept");
      const number = conceptSet.values.indexOf(inputData);
      if (conceptSet.key[number] === savedData) {
        query.delete("concept");
        setQuery(query);
      } else {
        query.set("concept", conceptSet.key[number]);
        setQuery(query);
      }
    }
    if (aboutFilter === "region") {
      const savedData = query.get("region");
      const number = regionSet.values.indexOf(inputData);
      if (regionSet.key[number] === savedData) {
        query.delete("region");
        setQuery(query);
      } else {
        query.set("region", regionSet.key[number]);
        setQuery(query);
      }
    }
  };

  const handleSubmit = () => {
    const sortNumber = storeSort ? sortSet.values.indexOf(storeSort) : null;
    const categoryNumber = storeConcept
      ? conceptSet.values.indexOf(storeConcept)
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
      concept: categoryNumber !== null ? conceptSet.key[categoryNumber] : null,
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
            {sortSet.values.map((item, index) => (
              <div
                className={`${dropdownStyles.item} ${
                  query.get("sort") === sortSet.key[index]
                    ? dropdownStyles.selected
                    : ""
                }`}
                key={item}
                onClick={() => handleClick(item, "sort")}
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
            {conceptSet.values.map((item, index) => (
              <div
                className={`${dropdownStyles.item} ${
                  query.get("concept") === conceptSet.key[index]
                    ? dropdownStyles.selected
                    : ""
                }`}
                key={item}
                onClick={() => handleClick(item, "concept")}
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
            {regionSet.values.map((item, index) => (
              <div
                className={`${dropdownStyles.item} ${
                  query.get("region") === regionSet.key[index]
                    ? dropdownStyles.selected
                    : ""
                }`}
                key={item}
                onClick={() => handleClick(item, "region")}
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
