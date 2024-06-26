import { IoSearch } from "react-icons/io5";

import searchBtnStyles from "./SearchToggleBtn.module.css";
import { useEffect, useRef, useState } from "react";
import FilterModal from "./FilterModal";

interface SearchToggleBtnProps {
  isScrolled: boolean;
  handleIsScrolled: () => void;
}

function SearchToggleBtn({
  isScrolled,
  handleIsScrolled,
}: SearchToggleBtnProps) {
  const [isActive, setIsActive] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsActive(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return isScrolled ? (
    <IoSearch size={"32px"} onClick={handleIsScrolled} />
  ) : (
    <div ref={dropdownRef} className={searchBtnStyles.wrapper}>
      <div
        className={searchBtnStyles.search}
        onClick={() => setIsActive((prev) => !prev)}
      >
        <button className={searchBtnStyles.toggleBtn}>
          {isActive ? (
            <input placeholder="도보 여행, #글램핑, #빵지순례" />
          ) : (
            <span>"도보 여행, #글램핑, #빵지순례"</span>
          )}
        </button>
        <div className={searchBtnStyles.icon}>
          <IoSearch size={"20px"} />
        </div>
      </div>
      {isActive && <FilterModal />}
    </div>
  );
}

export default SearchToggleBtn;
