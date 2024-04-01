import btnStyle from "./UserOptionBtn.module.css";

interface userOptionProps {
  name: string;
  clickAction?: () => void;
}
function UserOptionBtn({ name, clickAction }: userOptionProps) {
  return (
    <button className={btnStyle.btn} onClick={clickAction}>
      {name}
    </button>
  );
}

export default UserOptionBtn;
