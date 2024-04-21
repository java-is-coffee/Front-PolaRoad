import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PersonIcon from "@mui/icons-material/Person";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import HomeIcon from "@mui/icons-material/Home";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useModal } from "hooks/modal/ModalProvider";
import ModalOption from "enum/modalOptionTypes";
import { FaRegSquarePlus } from "react-icons/fa6";
import useBucket from "hooks/bucket/useBucket";
import secureLocalStorage from "react-secure-storage";
import { IMemberInfoDetails } from "interface/member/IMemberInfoDetails";
import getMemberInfo from "api/member/getMemberInfo";
import { Avatar } from "@mui/material";

const commonStyles = {
  "&.Mui-selected": { color: "#12b193" },
  ".MuiBottomNavigationAction-label": { fontSize: "1.2rem" },
  "&.Mui-selected .MuiBottomNavigationAction-label": {
    fontSize: "1.5rem",
    fontWeight: "500",
  },
};

const BottomNavigator = () => {
  const navigate = useNavigate();

  const { openModal } = useModal();
  const openNewPostModal = () => {
    openModal(ModalOption.POST);
  };
  const [value, setValue] = useState(null);
  const { getImage } = useBucket();
  const [profileImgURL, setProfileImgURL] = useState<string>("");
  const isLogin = secureLocalStorage.getItem("accessToken");
  useEffect(() => {
    if (isLogin) {
      const fetchMemberInfo = async () => {
        const result: IMemberInfoDetails | null = await getMemberInfo();
        if (result) {
          const imgUrl = await getImage(result.profileImage);
          if (imgUrl) {
            setProfileImgURL(imgUrl);
          }
        }
      };
      fetchMemberInfo();
    }
    // eslint-disable-next-line
  }, []);

  const location = useLocation();
  if (location.pathname === "/login") {
    return <div></div>; // 로그인 페이지인 경우, 아무것도 렌더링하지 않습니다.
  }

  return (
    <div style={{ borderTop: "1px solid #ccc" }}>
      <BottomNavigation
        value={value}
        onChange={(event, newValue) => {
          event.preventDefault();
          if (newValue === "New") {
            openNewPostModal();
            return;
          }
          navigate(`/${newValue}`);
          setValue(newValue);
        }}
      >
        <BottomNavigationAction
          sx={commonStyles}
          value={"explore"}
          icon={<HomeIcon sx={{ fontSize: "2.5rem" }} />}
        />
        <BottomNavigationAction
          sx={commonStyles}
          value={"subscribe"}
          icon={
            <FavoriteIcon
              sx={{
                fontSize: "2.5rem",
              }}
            />
          }
        />
        <BottomNavigationAction
          sx={commonStyles}
          value={"New"}
          icon={<FaRegSquarePlus size="24px" />}
        />
        <BottomNavigationAction
          sx={commonStyles}
          value={"map"}
          icon={
            <LocationOnIcon
              sx={{
                fontSize: "2.5rem",
              }}
            />
          }
        />
        <BottomNavigationAction
          value={"my"}
          sx={commonStyles}
          icon={
            profileImgURL !== "" ? (
              <Avatar
                alt="avata"
                sx={{ width: 24, height: 24 }}
                src={profileImgURL}
              />
            ) : (
              <PersonIcon />
            )
          }
        />
      </BottomNavigation>
    </div>
  );
};

export default BottomNavigator;
