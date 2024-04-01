import MainCategory from "components/category/MainCategory";
import headerStyle from "./MobileHeader.module.css";
import SearchIcon from "@mui/icons-material/Search";
import TuneIcon from "@mui/icons-material/Tune";
function MobileHeader() {
  //true = pc화면 / false = 모바일 화면 767이하

  return (
    <div className={headerStyle.header}>
      <div className={headerStyle.input}>
        <div>
          <SearchIcon sx={{ color: "#bbbbbb", fontSize: "2rem" }} />
        </div>
        <div>Search</div>
        <div>
          <TuneIcon sx={{ color: "#bbbbbb", fontSize: "2rem" }} />
        </div>
      </div>
      <div>
        <MainCategory />
      </div>
    </div>
  );
}

export default MobileHeader;
