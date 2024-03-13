import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
import btnStyle from "./UserActionBtn.module.css";
import ModalOption from "../../../enum/modalOptionTypes";
import { useModal } from "../../../hooks/modal/ModalProvider";
interface userActionBtnProps {
  name: string;
  icon: ReactJSXElement;
  type: ModalOption;
}
function UserActionBtn({ name, icon, type }: userActionBtnProps) {
  const { openModal } = useModal();
  const handleModal = () => {
    openModal(type);
    console.log("open modal");
    console.log(type);
  };
  return (
    <button className={btnStyle.btn} onClick={handleModal}>
      {icon}
      {name}
    </button>
  );
}

export default UserActionBtn;
