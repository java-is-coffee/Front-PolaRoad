// import { ImageList, ImageListItem, ImageListItemBar } from "@mui/material";
// import MainPhotoCard from "../../card/mainPhoto/MainPhotoCard";
import { useEffect } from "react";
import MainPhotoCard from "../../card/mainPhoto/MainPhotoCard";
import styles from "./ExplorePhotoList.module.css";
import useExploreHooks from "../../../hooks/explore/useExploreHooks";
import { useDispatch } from "react-redux";
import { useMediaQuery } from "@mui/material";
import {
  GetFollowListDTO,
  GetListDTO,
  PostData,
} from "interface/explore/ExplorePost";
import { useInView } from "react-intersection-observer";
import {
  setCurPage,
  setEndPoint,
} from "../../../redux/reducers/explore/explorePostReducer";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import useStoreValue from "hooks/storeValue/useStoreValue";
import secureLocalStorage from "react-secure-storage";

const ExplorePhotoList = () => {
  const { setPostList, addPostList, setFollowPostList } = useExploreHooks();

  const navigate = useNavigate();
  const location = useLocation();
  const isSmallScreen = useMediaQuery("(max-width : 767px)");

  const dispatch = useDispatch();

  const [query, setQuery] = useSearchParams();

  const { storePostList, storeEndPoint, storeCurPage } = useStoreValue();

  //화면이 전부 나와야하며, 1초 딜레이
  const [ref, inView] = useInView({
    threshold: 0.8,
  });

  useEffect(() => {
    if (secureLocalStorage.getItem("accessToken") === null) {
      navigate("/login", {
        state: {
          from: location.pathname,
          search: location.search,
        },
      });
      return;
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    console.log("시작");

    console.log(location.state);

    if (location.state !== null) {
      query.set("search", location.state.searchInput);
      setQuery(query);
    }

    if (storePostList === null && secureLocalStorage.getItem("accessToken")) {
      if (query.get("follow") === "true") {
        const initPostList: GetFollowListDTO = {
          paging: 1,
          pagingNumber: 16,
          concept: query.get("concept"),
        };
        setFollowPostList(initPostList);
      } else {
        const initPostList: GetListDTO = {
          paging: 1,
          pagingNumber: 16,
          searchType: "KEYWORD",
          keyword: query.get("search"),
          sortBy: query.get("sort") !== null ? query.get("sort") : "RECENT",
          concept: query.get("concept"),
          region: query.get("region"),
        };
        setPostList(initPostList);
      }
    }

    // eslint-disable-next-line
  }, [query, storePostList]);

  useEffect(() => {
    //렌더링 시작 시, 해당 view가 바로 포착되어서 .
    if (inView && !storeEndPoint && storePostList !== null) {
      console.log("추가 로딩");
      dispatch(setCurPage(storeCurPage + 1));
      addPostFunc(storeCurPage);
    }
    // eslint-disable-next-line
  }, [inView]);

  const addPostFunc = async (value: number) => {
    if (query.get("follow") === "true") {
      const initPostList: GetFollowListDTO = {
        paging: value + 1,
        pagingNumber: 16,
        concept: query.get("concept"),
      };
      setFollowPostList(initPostList);
    } else {
      const addData: GetListDTO = {
        paging: value + 1,
        pagingNumber: 16,
        searchType: "KEYWORD",
        keyword: query.get("search"),
        sortBy: query.get("sort") ? query.get("sort") : "RECENT",
        concept: query.get("concept"),
        region: query.get("region"),
      };

      const result = await addPostList(addData);
      if (result === 0) {
        dispatch(setEndPoint(true));
      }
    }
  };

  return (
    <div className={`${styles.photoZone} ${isSmallScreen ? styles.mt : ""}`}>
      {storePostList ? (
        storePostList.length === 0 ? (
          <div className={styles.nonePost}>
            적합한 게시글이 존재하지 않아요 ㅠ ㅅ ㅠ
          </div>
        ) : (
          storePostList.map((item: PostData) => (
            <div key={item.postId} className={styles.card}>
              <MainPhotoCard item={item} />
            </div>
          ))
        )
      ) : (
        ""
      )}

      <div ref={ref} className={styles.wait}></div>
    </div>
  );
};

export default ExplorePhotoList;
