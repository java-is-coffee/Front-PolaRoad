import { useEffect, useState } from "react";
import ModalOption from "../../../enum/modalOptionTypes";
import { useModal } from "../../../hooks/modal/ModalProvider";
import dropdownStyles from "./SearchDropdown.module.css";
// import useExploreHooks from "../../../hooks/explore/useExploreHooks";
import { Button } from "@mui/material";
import { conceptSet, regionSet, sortSet } from "interface/explore/ExplorePost";
// import useStoreValue from "hooks/storeValue/useStoreValue";
import { useSearchParams } from "react-router-dom";

function SearchDropdown() {
  const { closeModal } = useModal();

  //얘들이 필요한 이유는 버튼이 눌렸을때 해당 버튼이 눌렸다는 상태를 저장하기 위해서.
  const [savedSort, setSavedSort] = useState<string | null>("");
  const [savedConcept, setSavedConcept] = useState<string | null>("");
  const [savedRegion, setSavedRegion] = useState<string | null>("");

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
    //savedData = 쿼리에 등록된 데이터 / number = 해당 데이터와 맞는 번호(key값에 대응하기 위해) / checkData = number와 매칭되는 키값 (FOOD & BUSAN)
    const savedData = query.get(aboutFilter);
    const number =
      aboutFilter === "sort"
        ? sortSet.values.indexOf(inputData)
        : aboutFilter === "region"
        ? regionSet.values.indexOf(inputData)
        : conceptSet.values.indexOf(inputData);
    const checkData =
      aboutFilter === "sort"
        ? sortSet.key[number]
        : aboutFilter === "region"
        ? regionSet.key[number]
        : conceptSet.key[number];

    const state =
      aboutFilter === "sort"
        ? setSavedSort
        : aboutFilter === "region"
        ? setSavedConcept
        : setSavedRegion;
    if (checkData === savedData) {
      query.delete(aboutFilter);
      state(null);
    } else {
      query.set(aboutFilter, checkData);
      state(checkData);
    }
  };

  const handleSubmit = () => {
    setQuery(query);
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
                  savedSort === sortSet.key[index] ||
                  sortSet.key[index] === query.get("sort")
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
                  savedConcept === conceptSet.key[index] ||
                  conceptSet.key[index] === query.get("concept")
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
                  savedRegion === regionSet.key[index] ||
                  regionSet.key[index] === query.get("region")
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
