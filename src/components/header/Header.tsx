import { useEffect, useState } from "react";
import { GoBell } from "react-icons/go";
import headerStyle from "./Header.module.css";
// import SearchToggleBtn from "../dropDown/search/SearchToggleBtn";
import { Avatar, IconButton, InputAdornment, TextField } from "@mui/material";
// import { IoSearch } from "react-icons/io5";
import SearchIcon from "@mui/icons-material/Search";

import { useState } from "react";
import useExploreHooks from "hooks/explore/useExploreHooks";
import { GetListDTO } from "interface/explore/ExplorePost";
import UserInfoDropdown from "components/dropDown/header/UserInfoDropDown";

function Header() {
  // const [isScrolled, setIsScrolled] = useState<boolean>(false);

  const [searchInput, setSearchInput] = useState("");
  const { setPostList } = useExploreHooks();

  const [openModal, setOpenModal] = useState(false);

  // useEffect(() => {
  //   const handleScroll = () => {
  //     if (window.scrollY > 20) {
  //       setIsScrolled(true);
  //     } else {
  //       setIsScrolled(false);
  //     }
  //   };

    // 스크롤 이벤트 리스너 추가
    window.addEventListener("scroll", handleScroll);

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // const handleIsScrolled = () => {
  //   setIsScrolled(false);
  // };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const setCategoyList: GetListDTO = {
      paging: 1,
      pagingNumber: 12,
      searchType: "KEYWORD",
      keyword: searchInput,
      sortBy: "RECENT",
      concept: null,
      region: null,
    };

    setPostList(setCategoyList);
  };

  const handleModal = () => {
    if (openModal === true) setOpenModal(false);
    else setOpenModal(true);
  };

  return (
    <div
      className={`${headerStyle.header} ${
        isScrolled ? headerStyle.scrolled : ""
      }`}
    >
      <div className={headerStyle.navigator}>
        <div className={headerStyle.headerLeft}>
          <div className={headerStyle.logoWrapper}>
            <span className={headerStyle.logo}>PolaRoad</span>
          </div>
          <div className={headerStyle.action}>
            <span>Home</span>
            <span>Explore</span>
            <span>Subscribe</span>
            <span>New Post</span>
          </div>
        </div>
        <div className={headerStyle.userAction}>
          <div
            className={`${headerStyle.searchToggleWrapper} ${
              isScrolled ? headerStyle.searchVisible : ""
            }`}
          >
            <SearchToggleBtn
              isScrolled={isScrolled}
              handleIsScrolled={handleIsScrolled}
            />
          </div>
          <GoBell size={"32px"} />
          <span onClick={handleModal}>
            <Avatar alt="Travis Howard" src="icons/favicon-32x32.png" />
          </span>
          <div style={{ position: "static" }}>
            {openModal ? <UserInfoDropdown setOpenModal={setOpenModal} /> : ""}
          </div>
        </div>
      </div>
      {!isScrolled && (
        <div className={headerStyle.searchToggleBtnOutside}>
          <SearchToggleBtn
            isScrolled={isScrolled}
            handleIsScrolled={handleIsScrolled}
          />
        </div>
      )}
    </div>
  );
}

export default Header;
