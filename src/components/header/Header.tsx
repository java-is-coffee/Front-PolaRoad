import { useEffect, useState } from "react";
import { GoBell } from "react-icons/go";
import headerStyle from "./Header.module.css";
import SearchToggleBtn from "../dropDown/search/SearchToggleBtn";
import { Avatar } from "@mui/material";

function Header() {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    // 스크롤 이벤트 리스너 추가
    window.addEventListener("scroll", handleScroll);

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleIsScrolled = () => {
    setIsScrolled(false);
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
            <span>Subscribe</span>
            <span>Map</span>
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
          <Avatar alt="Travis Howard" src="icons/favicon-32x32.png" />
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
