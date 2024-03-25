// import { useEffect } from "react";
// import ModalOption from "../../../enum/modalOptionTypes";
// import { useModal } from "../../../hooks/modal/ModalProvider";
import dropdownStyles from "./UserInfoDropDown.module.css";
import useLogin from "hooks/login/useLogin";

function UserInfoDropdown({
  setOpenModal,
}: {
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { MyPage } = useLogin();

  // const FormComponent = formComponents[postFormIndex];

  // 모달 바깥쪽 눌렀을떄 모달 탈출
  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target !== event.currentTarget) {
      setOpenModal(false);
    }
  };

  return (
    <div className={dropdownStyles.outSide} onClick={handleBackdropClick}>
      <div className={dropdownStyles.item} onClick={MyPage}>
        마이 페이지
      </div>
    </div>
  );
}

export default UserInfoDropdown;
