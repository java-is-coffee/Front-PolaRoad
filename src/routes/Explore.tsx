import { useEffect } from "react";
import WebHeader from "../components/header/web/WebHeader";
import MobileHeader from "../components/header/mobile/MobileHeader";
import ExploreContainer from "../containers/explore/ExploreContainer";
import { useModal } from "../hooks/modal/ModalProvider";
import ModalOption from "../enum/modalOptionTypes";
import FilterModal from "../components/dropDown/search/FilterModal";
import { useMediaQuery } from "@mui/material";
import SearchDropdown from "components/dropDown/search/SearchDropdown";
import NewPostModal from "components/modal/newPost/NewPostModal";
import WarningModal from "components/modal/warn/WarningModal";
import ShareModal from "components/modal/shareModal/ShareModal";

function Explore() {
  const { registerModal, closeModal } = useModal();
  const isSmallScreen = useMediaQuery("(max-width: 767px)");
  //   1. 낮은 해상도의 PC, 태블릿 가로 : ~1024px
  // 2. 테블릿 가로 : 768px ~ 1023px
  // 3. 모바일 가로, 태블릿 : 480px ~ 767px
  // 4. 모바일 : ~ 480px.
  useEffect(() => {
    registerModal(ModalOption.FILTER, <FilterModal />);
    registerModal(ModalOption.SEARCH, <SearchDropdown />);
    registerModal(ModalOption.POST, <NewPostModal />);
    registerModal(ModalOption.WARNING, <WarningModal />);
    registerModal(ModalOption.SHARE, <ShareModal />);
    return () => {
      closeModal(ModalOption.FILTER);
      closeModal(ModalOption.SEARCH);
      closeModal(ModalOption.POST);
      closeModal(ModalOption.WARNING);
      closeModal(ModalOption.SHARE);
    };
    // eslint-disable-next-line
  }, []);
  return (
    <div>
      {isSmallScreen ? <MobileHeader /> : <WebHeader />}
      <ExploreContainer />
    </div>
  );
}
export default Explore;
