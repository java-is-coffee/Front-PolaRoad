import { GoBell } from "react-icons/go";
import headerStyle from "./WebHeader.module.css";
import { Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import HeaderSearch from "components/form/header/HeaderSearch";
import { useEffect, useState } from "react";
import useBucket from "hooks/bucket/useBucket";
import { IMemberInfoDetails } from "interface/member/IMemberInfoDetails";
import getMemberInfo from "api/member/getMemberInfo";
import secureLocalStorage from "react-secure-storage";

function WebHeader() {
  const navigate = useNavigate();

  const navigation = (input: string) => {
    navigate(`/${input}`);
  };

  const resetPage = () => {
    navigate("/explore");
  };
  //true = pc화면 / false = 모바일 화면 767이하

  const [profileImgURL, setProfileImgURL] = useState<string>("");
  const { getImage } = useBucket();

  useEffect(() => {
    if (secureLocalStorage.getItem("accessToken")) {
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

  return (
    <div className={headerStyle.header}>
      <div className={headerStyle.navigator}>
        <div className={headerStyle.headerLeft}>
          <div className={headerStyle.logoWrapper}>
            {/* 임시적으로 부여 */}
            <span className={headerStyle.logo} onClick={resetPage}>
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
            <Avatar
              alt="Travis Howard"
              src={
                profileImgURL !== "" ? profileImgURL : `icons/favicon-32x32.png`
              }
            />
          </span>
        </div>
      </div>
    </div>
  );
}

export default WebHeader;
