import HistoryOption from "../../../enum/historyOptionType";
import headerStyles from "./userGalleryHeader.module.css";

interface userGalleryHeaderProps {
  option: HistoryOption;
  handleOptionChange: (option: HistoryOption) => void;
}

function UserGalleryHeader({
  option,
  handleOptionChange,
}: userGalleryHeaderProps) {
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

export default UserGalleryHeader;
