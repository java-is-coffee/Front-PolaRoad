// import { useState } from "react";
import { GoBell } from "react-icons/go";
import headerStyle from "./Header.module.css";
// import SearchToggleBtn from "../dropDown/search/SearchToggleBtn";
import {
  Avatar,
  Button,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
// import { IoSearch } from "react-icons/io5";
import SearchIcon from "@mui/icons-material/Search";

import { useEffect, useState } from "react";
import useExploreHooks from "hooks/explore/useExploreHooks";
import { GetListDTO } from "interface/explore/ExplorePost";
import UserInfoDropdown from "components/dropDown/header/UserInfoDropDown";
import secureLocalStorage from "react-secure-storage";
import { useNavigate } from "react-router-dom";

function Header() {
  const [searchInput, setSearchInput] = useState("");
  const { setPostList } = useExploreHooks();

  const [openModal, setOpenModal] = useState(false);

  const [isLogin, setIsLogin] = useState(false);

  const navigate = useNavigate();

  // useEffect(() => {
  //   const handleScroll = () => {
  //     if (window.scrollY > 20) {
  //       setIsScrolled(true);
  //     } else {
  //       setIsScrolled(false);
  //     }
  //   };

  //   // 스크롤 이벤트 리스너 추가
  //   window.addEventListener("scroll", handleScroll);

  //   // 컴포넌트 언마운트 시 이벤트 리스너 제거
  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, []);

  // const handleIsScrolled = () => {
  //   setIsScrolled(false);
  // };

  useEffect(() => {
    if (secureLocalStorage.getItem("accessToken")) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
    //eslint-disable-next-line
  }, []);

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

  const goLogin = () => {
    navigate("/login");
  };

  return (
    <div
      className={headerStyle.header}
      // className={`${headerStyle.header} ${
      //   isScrolled ? headerStyle.scrolled : ""
      // }`}
    >
      <div className={headerStyle.navigator}>
        <div className={headerStyle.headerLeft}>
          <div className={headerStyle.logoWrapper}>
            <span className={headerStyle.logo}>PolaRoad</span>
          </div>
          <div className={headerStyle.action}>
            <span>Home</span>
            <span>Subscribe</span>
            <span>Map</span>
            <span>New Post</span>
          </div>
        </div>
        <div className={headerStyle.userAction}>
          <div
            className={`${headerStyle.searchToggleWrapper} ${headerStyle.searchVisible}`}
          >
            {/* <SearchToggleBtn
              isScrolled={isScrolled}
              handleIsScrolled={handleIsScrolled}
            /> */}
            <form action="post" onSubmit={handleSubmit}>
              <TextField
                id="outlined-basic"
                variant="outlined"
                placeholder="ex)도보여행, #글램핑, #빵지순례"
                fullWidth
                value={searchInput}
                onChange={(value: React.ChangeEvent<HTMLInputElement>) => {
                  setSearchInput(value.target.value);
                }}
                required
                sx={{
                  ".MuiOutlinedInput-root": { fontSize: "1.3rem" },
                  width: "20vw",
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        type="submit"
                        edge="end"
                        sx={{ backgroundColor: "#13c4a3", marginRight: "-1px" }}
                      >
                        <SearchIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </form>
            {/* <IoSearch size={"20px"} /> */}
          </div>

          {isLogin ? (
            <>
              <GoBell size={"32px"} />
              <span onClick={handleModal}>
                <Avatar alt="Travis Howard" src="icons/favicon-32x32.png" />
              </span>
            </>
          ) : (
            <Button
              variant="text"
              sx={{ fontSize: "1.5rem", color: "#13c4a3" }}
              onClick={goLogin}
            >
              로그인
            </Button>
          )}

          <div style={{ position: "static" }}>
            {openModal ? <UserInfoDropdown setOpenModal={setOpenModal} /> : ""}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
