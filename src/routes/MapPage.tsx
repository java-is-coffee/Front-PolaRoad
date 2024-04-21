import { useMediaQuery } from "@mui/material";
import LogoHeader from "components/header/logoHeader/LogoHeader";
import Header from "components/header/web/WebHeader";
import MapPageContainer from "containers/map/MapPageContainer";
import MapPageContainerMobile from "containers/map/moblie/MapPageContainerMoblie";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";
import { toast } from "react-toastify";

function MapPage() {
  const location = useLocation();
  const nav = useNavigate();
  useEffect(() => {
    const token = secureLocalStorage.getItem("accessToken");
    if (!token) {
      toast.error("로그인이 필요한 기능입니다.");
      nav("/login", { state: { from: location }, replace: true });
    }
    // eslint-disable-next-line
  }, []);

  const isSmallScreen = useMediaQuery("(max-width: 767px)");
  return (
    <div>
      {isSmallScreen ? <LogoHeader /> : <Header />}
      {isSmallScreen ? <MapPageContainerMobile /> : <MapPageContainer />}
      <div
        style={{
          position: "fixed",
          bottom: "0%",
          width: "100%",
          zIndex: "1000",
        }}
      ></div>
    </div>
  );
}

export default MapPage;
