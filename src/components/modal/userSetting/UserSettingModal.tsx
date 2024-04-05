import { useModal } from "hooks/modal/ModalProvider";
import modalStyles from "./UserSettingModal.module.css";
import ModalOption from "enum/modalOptionTypes";
import secureLocalStorage from "react-secure-storage";

const UserSettingModal = () => {
  const { openModal, closeModal } = useModal();

  const handleCancel = () => {
    closeModal(ModalOption.USER_SETTING);
  };

  const handleLogout = () => {
    secureLocalStorage.clear();
    window.location.href = "/";
    handleCancel();
  };

  const handleUserInfo = () => {
    handleCancel();
    openModal(ModalOption.USER_INFO);
  };

  return (
    <div className={modalStyles.backdrop} onClick={handleCancel}>
      <div
        className={modalStyles.modalContents}
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={handleUserInfo}>설정 및 개인정보</button>
        <hr className={modalStyles.divider} />
        <button className={modalStyles.warningOption} onClick={handleLogout}>
          로그아웃
        </button>
        <hr className={modalStyles.divider} />
        <button onClick={handleCancel}>취소</button>
      </div>
    </div>
  );
};

export default UserSettingModal;
