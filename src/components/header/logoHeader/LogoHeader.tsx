import headerStyle from "./LogoHeader.module.css";
import { useNavigate } from "react-router-dom";

function LogoHeader() {
  const navigate = useNavigate();

  return (
    <div className={headerStyle.header}>
      <div className={headerStyle.logoWrapper}>
        <span className={headerStyle.logo} onClick={() => navigate("/explore")}>
          PolaRoad
        </span>
      </div>
    </div>
  );
}

export default LogoHeader;
