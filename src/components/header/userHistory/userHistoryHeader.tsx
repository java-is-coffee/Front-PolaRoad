import HistoryOption from "../../../enum/historyOptionType";
import headerStyles from "./userHistoryHeader.module.css";

interface userHistoryHeaderProps {
  option: HistoryOption;
  handleOptionChange: (option: HistoryOption) => void;
}

function UserHistoryHeader({
  option,
  handleOptionChange,
}: userHistoryHeaderProps) {
  return (
    <div className={headerStyles.headerWrapper}>
      <div
        className={`${headerStyles.option} ${
          option === HistoryOption.POST ? headerStyles.selected : ""
        }`}
        onClick={() => handleOptionChange(HistoryOption.POST)}
      >
        POST
      </div>
      <div
        className={`${headerStyles.option} ${
          option === HistoryOption.WISH ? headerStyles.selected : ""
        }`}
        onClick={() => handleOptionChange(HistoryOption.WISH)}
      >
        WISH
      </div>
      <div
        className={`${headerStyles.option} ${
          option === HistoryOption.ALBUM ? headerStyles.selected : ""
        }`}
        onClick={() => handleOptionChange(HistoryOption.ALBUM)}
      >
        ALBUM
      </div>
    </div>
  );
}

export default UserHistoryHeader;
