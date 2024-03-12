import btnStyle from "./userOptionBtn.module.css";

interface userOptionProps {
  name: string;
}
function UserOptionBtn({ name }: userOptionProps) {
  return <button className={btnStyle.btn}>{name}</button>;
}

export default UserOptionBtn;
