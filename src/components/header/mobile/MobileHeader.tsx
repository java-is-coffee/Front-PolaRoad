import headerStyle from "./MobileHeader.module.css";
import SearchIcon from "@mui/icons-material/Search";
import TuneIcon from "@mui/icons-material/Tune";
import useStoreValue from "hooks/storeValue/useStoreValue";
import { setIsMobileSearchFilter } from "../../../redux/reducers/explore/exploreMobileSetting";
import { IconButton } from "@mui/material";
import ModalOption from "enum/modalOptionTypes";
import { useModal } from "hooks/modal/ModalProvider";

export interface RecentDTO {
  id: number;
  data: string;
}

function MobileHeader() {
  const { setValue } = useStoreValue();
  const { openModal } = useModal();

  const handleComponent = () => {
    setValue(setIsMobileSearchFilter(true));
  };

  return (
    <div className={headerStyle.header}>
      <div className={headerStyle.searchBox}>
        <div>
          <IconButton>
            <SearchIcon sx={{ color: "#bbbbbb", fontSize: "2rem" }} />
          </IconButton>
        </div>
        <div onClick={() => openModal(ModalOption.SEARCH)}>Search</div>
        <div onClick={handleComponent}>
          <TuneIcon sx={{ color: "#bbbbbb", fontSize: "2rem" }} />
        </div>
      </div>
    </div>
  );
}

export default MobileHeader;
