import { useEffect, useRef, useState } from "react";
import modalStyles from "./NewPostModal.module.css";
import ActionBtn from "../../button/post/ActionBtn";
import NewPostDetails from "../../form/post/NewPostDetails";
import NewPostTheme from "../../form/post/NewPostTheme";
import NewCardList from "../../form/card/NewCardList";
import { useModal } from "hooks/modal/ModalProvider";
import ModalOption from "enum/modalOptionTypes";
import { Step, StepLabel, Stepper } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "redux/store/store";
import INewPost from "interface/post/INewPost";
import { toast } from "react-toastify";
import {
  filterCardNoneImage,
  resetPostDetails,
  setPostId,
  setRoutePoint,
} from "../../../redux/reducers/newPost/newPostReducers";
import { QontoConnector, QontoStepIcon } from "./QontoStepStyle";
import postNewPost from "api/post/postNewPost";
import { validateCardList } from "utils/card/validateCardDetails";

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
  const { openModal, closeModal } = useModal();
  const [postFormIndex, setPostFormIndex] = useState<number>(0);
  const postDetails: INewPost = useSelector(
    (state: RootState) => state.newPost.postDetail
  );
  const modalRef = useRef<HTMLDivElement>(null); // 모달 DOM에 접근하기 위한 ref
  const dispatch = useDispatch();

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

  // 모달 생성시 postId 적용
  useEffect(() => {
    dispatch(setPostId());
    //eslint-disable-next-line
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
          dispatch(filterCardNoneImage());
          if (validateCardList(postDetails.cards)) {
            setPostFormIndex((prev) => prev + 1);
          }
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

  const handleUploadButtonClick = () => {
    if (postDetails.title) {
      dispatch(setRoutePoint());
      submitPostToServer();
    } else {
      toast.error("제목은 필수항목입니다.");
    }
  };

  const submitPostToServer = async () => {
    const result = await postNewPost(postDetails);
    if (result) {
      dispatch(resetPostDetails());
      closeModal(ModalOption.POST);
    }
  };

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
              <ActionBtn name="업로드" handleClick={handleUploadButtonClick} />
            )}
          </div>
          <Stepper
            alternativeLabel
            activeStep={postFormIndex}
            connector={<QontoConnector />}
          >
            {formComponents.map((Component, index) => (
              <Step key={index}>
                <StepLabel
                  StepIconComponent={QontoStepIcon}
                  sx={{
                    ".MuiStepLabel-label": {
                      fontWeight: "500",
                      fontSize: "1.4rem",
                    },
                  }}
                >
                  {Component.name}
                </StepLabel>
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
