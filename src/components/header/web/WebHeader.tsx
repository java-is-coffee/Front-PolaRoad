import { GoBell } from "react-icons/go";
import headerStyle from "./WebHeader.module.css";
import { Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import HeaderSearch from "components/form/header/HeaderSearch";

function WebHeader() {
  const navigate = useNavigate();
  const navigation = (input: string) => {
    navigate(`/${input}`);
  };
  //true = pc화면 / false = 모바일 화면 767이하

  return (
    <div className={headerStyle.header}>
      <div className={headerStyle.navigator}>
        <div className={headerStyle.headerLeft}>
          <div className={headerStyle.logoWrapper}>
            {/* 임시적으로 부여 */}
            <span
              className={headerStyle.logo}
              onClick={() => {
                navigation("login");
              }}
            >
              PolaRoad
            </span>
          </div>
          <div className={headerStyle.action}>
            <span
              onClick={() => {
                navigation("explore");
              }}
            >
              Home
            </span>
            <span>Subscribe</span>
            <span>Map</span>
            <span>New Post</span>
          </div>
        </div>
        <div className={headerStyle.userAction}>
          <div
            className={`${headerStyle.searchToggleWrapper} ${headerStyle.searchVisible}`}
          >
            <HeaderSearch />
          </div>

          <GoBell size={"32px"} />
          <span
            onClick={() => {
              navigation("my");
            }}
          >
            <Avatar alt="Travis Howard" src="icons/favicon-32x32.png" />
          </span>
        </div>
      </div>
    </div>
  );
}

export default WebHeader;
