import { useEffect } from "react";
import WebHeader from "../components/header/web/WebHeader";
import MobileHeader from "../components/header/mobile/MobileHeader";
import ExploreContainer from "../containers/explore/ExploreContainer";
import { useModal } from "../hooks/modal/ModalProvider";
import ModalOption from "../enum/modalOptionTypes";
import SearchDropdown from "../components/dropDown/search/SearchDropdown";
import { useMediaQuery } from "@mui/material";
import BottomNavigator from "components/bottom/BottomNavigator";
import { useParams } from "react-router-dom";

function ExploreSearch() {
  const { registerModal, closeModal } = useModal();
  const isSmallScreen = useMediaQuery("(max-width: 767px)");

  const params = useParams();
  //   1. 낮은 해상도의 PC, 태블릿 가로 : ~1024px
  // 2. 테블릿 가로 : 768px ~ 1023px
  // 3. 모바일 가로, 태블릿 : 480px ~ 767px
  // 4. 모바일 : ~ 480px
  useEffect(() => {
    registerModal(ModalOption.SEARCH, <SearchDropdown />);
    console.log(params);
    return () => closeModal(ModalOption.SEARCH);
    // eslint-disable-next-line
  }, []);
  return (
    <div>
      {isSmallScreen ? <MobileHeader /> : <WebHeader />}
      <ExploreContainer />
      <div style={{ position: "fixed", bottom: "0%", width: "100%" }}>
        {isSmallScreen ? <BottomNavigator /> : ""}
      </div>
    </div>
  );
}

export default ExploreSearch;
