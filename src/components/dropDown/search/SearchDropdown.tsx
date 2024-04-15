import { useModal } from "hooks/modal/ModalProvider";
import styles from "./SearchDropdown.module.css";
import ModalOption from "enum/modalOptionTypes";
import { useEffect } from "react";
import SearchModal from "components/form/header/SearchModal";

const SearchDropdown = () => {
  const { closeModal } = useModal();

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

  return (
    <div className={styles.container} onClick={handleBackdropClick}>
      <div className={styles.modal}>
        검색
        <div>
          <SearchModal />
        </div>
      </div>
    </div>
  );
};

export default SearchDropdown;
