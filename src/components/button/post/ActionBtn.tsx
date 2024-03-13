import btnStyles from "./ActionBtn.module.css";

interface actionBtnProps {
  name: string;
  handleClick: () => void;
  isHidden?: boolean;
}
function ActionBtn({ name, handleClick, isHidden }: actionBtnProps) {
  return (
    <button
      className={btnStyles.btn}
      onClick={handleClick}
      style={{ visibility: isHidden ? "hidden" : "visible" }}
    >
      {name}
    </button>
  );
}
export default ActionBtn;
