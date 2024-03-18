import { useEffect, useRef, useState } from "react";
import modalStyles from "./NewPostModal.module.css";
import ActionBtn from "../../button/post/ActionBtn";
import NewPostDetails from "../../form/post/NewPostDetails";
import NewPostTheme from "../../form/post/NewPostTheme";
import NewCardList from "../../form/card/NewCardList";
import { useModal } from "hooks/modal/ModalProvider";
import ModalOption from "enum/modalOptionTypes";

const formComponents = [NewPostTheme, NewCardList, NewPostDetails];

function NewPostModal() {
  const { openModal } = useModal();
  const [postFormIndex, setPostFormIndex] = useState<number>(0);
  const modalRef = useRef<HTMLDivElement>(null); // 모달 DOM에 접근하기 위한 ref

  // useEffect(() => {
  //   const modal = modalRef.current;
  //   console.log(postFormIndex);
  //   if (modal) {
  //     // 모달의 최대 크기를 현재 컨텐츠 크기에 기반하여 설정
  //     const contentWidth = modal.offsetWidth; // 첫 번째 자식 요소의 너비
  //     const contentHeight = modal.offsetHeight; // 첫 번째 자식 요소의 높이
  //     console.log(contentHeight);
  //     console.log(contentWidth);
  //     modalContent의 스타일을 업데이트하여 transition 효과 적용
  //     modal.style.width = `${contentWidth}px`;
  //     modal.style.height = `${contentHeight}px`;
  //   }
  // }, [postFormIndex]);

  // Esc 눌렀을때 모달 탈출n
  const handleKeyUp = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      openModal(ModalOption.WARNING);
    }
  };
  // 모달 바깥쪽 눌렀을떄 모달 탈출
  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      openModal(ModalOption.WARNING);
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

  const increaseFormIndex = () => {
    if (postFormIndex < formComponents.length - 1) {
      setPostFormIndex((prev) => prev + 1);
    }
  };

  const decreaseFromIndex = () => {
    if (postFormIndex > 0) {
      setPostFormIndex((prev) => prev - 1);
    }
  };

  const handleUploadPost = () => {};

  return (
    <div className={modalStyles.modalBackdrop} onClick={handleBackdropClick}>
      <div className={modalStyles.wrapper} onClick={handleBackdropClick}>
        <div
          ref={modalRef}
          className={modalStyles.modalContent}
          onClick={(e) => e.stopPropagation()}
        >
          <div className={modalStyles.header}>
            <ActionBtn
              name="이전"
              handleClick={decreaseFromIndex}
              isHidden={postFormIndex > 0 ? false : true}
            />
            <span>Create New Post</span>
            {postFormIndex < formComponents.length - 1 ? (
              <ActionBtn name="다음" handleClick={increaseFormIndex} />
            ) : (
              <ActionBtn name="업로드" handleClick={handleUploadPost} />
            )}
          </div>
          {formComponents.map((Component, index) => (
            <div
              key={index}
              style={{ display: index === postFormIndex ? "block" : "none" }}
            >
              <Component />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default NewPostModal;
