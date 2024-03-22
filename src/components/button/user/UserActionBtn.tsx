import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
import btnStyle from "./UserActionBtn.module.css";
import ModalOption from "../../../enum/modalOptionTypes";
import { useModal } from "../../../hooks/modal/ModalProvider";
import secureLocalStorage from "react-secure-storage";
import { toast } from "react-toastify";

interface userActionBtnProps {
  name: string;
  icon: ReactJSXElement;
  type: ModalOption;
}
function UserActionBtn({ name, icon, type }: userActionBtnProps) {
  const { openModal } = useModal();
  const handleModal = () => {
    if (secureLocalStorage.getItem("accessToken")) {
      openModal(type);
    } else {
      toast.error("로그인이 필요한 기능입니다.");
    }
  };
  return (
    <button className={btnStyle.btn} onClick={handleModal}>
      {icon}
      {name}
    </button>
  );
}

export default UserActionBtn;
