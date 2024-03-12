import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
import btnStyle from "./UserActionBtn.module.css";
interface userActionBtnProps {
  name: string;
  icon: ReactJSXElement;
}
function UserActionBtn({ name, icon }: userActionBtnProps) {
  return (
    <button className={btnStyle.btn}>
      {icon}
      {name}
    </button>
  );
}

export default UserActionBtn;
