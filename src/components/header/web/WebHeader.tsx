// import { GoBell } from "react-icons/go";
import headerStyle from "./WebHeader.module.css";
import { Avatar, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useBucket from "hooks/bucket/useBucket";
import { IMemberInfoDetails } from "interface/member/IMemberInfoDetails";
import getMemberInfo from "api/member/getMemberInfo";
import SearchIcon from "@mui/icons-material/Search";
import secureLocalStorage from "react-secure-storage";
import { useModal } from "hooks/modal/ModalProvider";
import ModalOption from "enum/modalOptionTypes";
import useStoreValue from "hooks/storeValue/useStoreValue";
import { setExplorePostList } from "../../../redux/reducers/explore/explorePostReducer";
import LoginIcon from "@mui/icons-material/Login";

function WebHeader() {
  const navigate = useNavigate();
  const { openModal } = useModal();
  const { setValue } = useStoreValue();
  const isLogin = secureLocalStorage.getItem("accessToken");

  const navigation = (input: string) => {
    navigate(`/${input}`);
  };

  const resetPage = () => {
    navigate("/explore");
    setValue(setExplorePostList(null));
  };
  //true = pc화면 / false = 모바일 화면 767이하

  const [profileImgURL, setProfileImgURL] = useState<string>("");
  const { getImage } = useBucket();

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
            <span onClick={resetPage}>Home</span>
            <span
              onClick={() => {
                navigation("map");
              }}
            >
              Map
            </span>
            {isLogin ? (
              <>
                <span
                  onClick={() => {
                    navigate("/explore?follow=true");
                    setValue(setExplorePostList(null));
                  }}
                >
                  Follow
                </span>
                <span
                  onClick={() => {
                    openModal(ModalOption.POST);
                  }}
                >
                  New Post
                </span>
              </>
            ) : (
              ""
            )}
          </div>
        </div>
        {isLogin !== null ? (
          <div className={headerStyle.userAction}>
            <div
              className={`${headerStyle.searchToggleWrapper} ${headerStyle.searchVisible}`}
            >
              <IconButton
                aria-label="toggle password visibility"
                edge="end"
                sx={{
                  backgroundColor: "#13c4a3",
                  marginRight: "-1px",
                }}
                onClick={() => {
                  openModal(ModalOption.SEARCH);
                }}
              >
                <SearchIcon />
              </IconButton>
            </div>

            {/* <GoBell size={"32px"} /> */}
            <span
              onClick={() => {
                navigation("my");
              }}
            >
              <Avatar
                alt="Travis Howard"
                src={
                  profileImgURL !== ""
                    ? profileImgURL
                    : `icons/favicon-32x32.png`
                }
              />
            </span>
          </div>
        ) : (
          <div className={headerStyle.userAction}>
            <IconButton
              onClick={() => {
                navigation("login");
              }}
            >
              <LoginIcon sx={{ fontSize: "2.5rem" }} />
            </IconButton>
          </div>
        )}
      </div>
    </div>
  );
}

export default WebHeader;
