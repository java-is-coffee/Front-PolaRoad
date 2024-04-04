import MainCategory from "components/category/MainCategory";
import headerStyle from "./MobileHeader.module.css";
import SearchIcon from "@mui/icons-material/Search";
import TuneIcon from "@mui/icons-material/Tune";
import useStoreValue from "hooks/storeValue/useStoreValue";
import { setIsMobileSearch } from "../../../redux/reducers/explore/explorePostReducer";
function MobileHeader() {
  //true = pc화면 / false = 모바일 화면 767이하

  const { isMobileSearch, setValue } = useStoreValue();

  const handleComponent = () => {
    setValue(setIsMobileSearch(true));
  };

  return (
    <div className={headerStyle.header}>
      <div className={headerStyle.searchBox}>
        <div>
          <SearchIcon sx={{ color: "#bbbbbb", fontSize: "2rem" }} />
        </div>
        <input className={headerStyle.input} placeholder="Search" />
        <div onClick={handleComponent}>
          <TuneIcon sx={{ color: "#bbbbbb", fontSize: "2rem" }} />
        </div>
      </div>
      {isMobileSearch ? (
        ""
      ) : (
        <div>
          <MainCategory />
        </div>
      )}
    </div>
  );
}

export default MobileHeader;
