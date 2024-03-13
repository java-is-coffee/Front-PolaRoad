import { useEffect, useState } from "react";
import ModalOption from "../../../enum/modalOptionTypes";
import { useModal } from "../../../hooks/modal/ModalProvider";
import CloseIcon from "@mui/icons-material/Close";
import modalStyles from "./NewPostModal.module.css";
import ActionBtn from "../../button/post/ActionBtn";
import NewPostDetails from "../../form/post/NewPostDetails";
import NewPostTheme from "../../form/post/NewPostTheme";
import NewCardDetails from "../../form/card/NewCardDetails";

const formComponents = [NewPostTheme, NewCardDetails, NewPostDetails];

function NewPostModal() {
  const { closeModal } = useModal();
  const [postFormIndex, setPostFormIndex] = useState<number>(0);
  const FormComponent = formComponents[postFormIndex];
  // Esc 눌렀을때 모달 탈출
  const handleKeyUp = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      closeModal(ModalOption.POST);
    }
  };
  // 모달 바깥쪽 눌렀을떄 모달 탈출
  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      closeModal(ModalOption.POST);
    }
  };
  // 컴포넌트 랜더링시에 한번만 리스너 추가
  useEffect(() => {
    document.addEventListener("keyup", handleKeyUp);
    return () => {
      document.removeEventListener("keyup", handleKeyUp);
    };
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
          <div className={modalStyles.formWrapper}>
            {FormComponent && <FormComponent />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewPostModal;
