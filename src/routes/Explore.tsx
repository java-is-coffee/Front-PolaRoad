import { useEffect } from "react";
import WebHeader from "../components/header/web/WebHeader";
import MobileHeader from "../components/header/mobile/MobileHeader";
import ExploreContainer from "../containers/explore/ExploreContainer";
import SearchDropdown from "../components/dropDown/search/SearchDropdown";
import { useMediaQuery } from "@mui/material";
import BottomNavigator from "components/bottom/BottomNavigator";

// 사용되는 모달 등록
import { useModal } from "hooks/modal/ModalProvider";
import ModalOption from "enum/modalOptionTypes";
import NewPostModal from "components/modal/newPost/NewPostModal";
import WarningModal from "components/modal/warn/WarningModal";
import ShareModal from "components/modal/shareModal/ShareModal";

function Explore() {
  const { registerModal, closeModal } = useModal();
  const isSmallScreen = useMediaQuery("(max-width: 767px)");
  //   1. 낮은 해상도의 PC, 태블릿 가로 : ~1024px
  // 2. 테블릿 가로 : 768px ~ 1023px
  // 3. 모바일 가로, 태블릿 : 480px ~ 767px
  // 4. 모바일 : ~ 480px
  useEffect(() => {
    registerModal(ModalOption.SEARCH, <SearchDropdown />);
    registerModal(ModalOption.POST, <NewPostModal />);
    registerModal(ModalOption.WARNING, <WarningModal />);
    registerModal(ModalOption.SHARE, <ShareModal />);
    return () => {
      closeModal(ModalOption.SEARCH);
      closeModal(ModalOption.POST);
      closeModal(ModalOption.WARNING);
      closeModal(ModalOption.SHARE);
    };
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

export default Explore;
