import { GoBell } from "react-icons/go";
import headerStyle from "./WebHeader.module.css";
import { Avatar, IconButton } from "@mui/material";
import { useNavigate, useSearchParams } from "react-router-dom";
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
import useExploreHooks from "hooks/explore/useExploreHooks";

function WebHeader() {
  const navigate = useNavigate();
  const { openModal } = useModal();
  const { setItem } = useExploreHooks();
  const { setValue } = useStoreValue();
  const [query, setQuery] = useSearchParams();

  const navigation = (input: string) => {
    navigate(`/${input}`);
  };

  const resetPage = () => {
    setValue(setExplorePostList(null));
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
            <span onClick={resetPage}>Home</span>
            <span
              onClick={() => {
                query.set("follow", "true");
                setQuery(query);
                setItem(setExplorePostList(null));
              }}
            >
              Follower
            </span>
            <span
              onClick={() => {
                navigation("map");
              }}
            >
              Map
            </span>
            <span
              onClick={() => {
                openModal(ModalOption.POST);
              }}
            >
              New Post
            </span>
          </div>
        </div>
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
