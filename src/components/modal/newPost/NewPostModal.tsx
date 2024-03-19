import { useEffect, useRef, useState } from "react";
import modalStyles from "./NewPostModal.module.css";
import ActionBtn from "../../button/post/ActionBtn";
import NewPostDetails from "../../form/post/NewPostDetails";
import NewPostTheme from "../../form/post/NewPostTheme";
import NewCardList from "../../form/card/NewCardList";
import { useModal } from "hooks/modal/ModalProvider";
import ModalOption from "enum/modalOptionTypes";
import { Step, StepLabel, Stepper } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "redux/store/store";
import INewPost from "interface/post/INewPost";
import { toast } from "react-toastify";

interface FormComponentsType {
  name: string;
  component: React.ElementType;
}

const formComponents: FormComponentsType[] = [
  { name: "테마 선정", component: NewPostTheme },
  { name: "카드 리스트", component: NewCardList },
  { name: "포스트 상세", component: NewPostDetails },
];

function NewPostModal() {
  const { openModal } = useModal();
  const [postFormIndex, setPostFormIndex] = useState<number>(0);
  const postDetails: INewPost = useSelector(
    (state: RootState) => state.newPost
  );
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
      if (postFormIndex === 0) {
        if (postDetails.concept && postDetails.region) {
          setPostFormIndex((prev) => prev + 1);
        } else {
          toast.error("theme 와 region은 필수 항목입니다.");
        }
      } else if (postFormIndex === 1) {
        if (postDetails.cards) {
          setPostFormIndex((prev) => prev + 1);
        } else {
          toast.error("최소 하나의 카드를 입력해주세요");
        }
      } else {
        setPostFormIndex((prev) => prev + 1);
      }
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
          <Stepper alternativeLabel activeStep={postFormIndex}>
            {formComponents.map((Component, index) => (
              <Step key={index}>
                <StepLabel>{Component.name}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {formComponents.map(({ component: Component }, index) => (
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
