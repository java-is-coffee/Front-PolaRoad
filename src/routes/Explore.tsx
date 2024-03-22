import { useEffect } from "react";
import Header from "../components/header/Header";
import ExploreContainer from "../containers/explore/ExploreContainer";
import { useModal } from "../hooks/modal/ModalProvider";
import ModalOption from "../enum/modalOptionTypes";
import SearchDropdown from "../components/dropDown/search/SearchDropdown";

function Explore() {
  const { registerModal, closeModal } = useModal();
  useEffect(() => {
    registerModal(ModalOption.SEARCH, <SearchDropdown />);
    return () => closeModal(ModalOption.SEARCH);
    // eslint-disable-next-line
  }, []);
  return (
    <div>
      <Header />
      <ExploreContainer />
    </div>
  );
}

export default Explore;
