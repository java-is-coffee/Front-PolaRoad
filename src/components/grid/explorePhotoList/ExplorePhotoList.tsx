// import { ImageList, ImageListItem, ImageListItemBar } from "@mui/material";
// import MainPhotoCard from "../../card/mainPhoto/MainPhotoCard";
import { useEffect } from "react";
import MainPhotoCard from "../../card/mainPhoto/MainPhotoCard";
import styles from "./ExplorePhotoList.module.css";
import useExploreHooks from "../../../hooks/explore/useExploreHooks";
import { useDispatch } from "react-redux";
import { CircularProgress, useMediaQuery } from "@mui/material";
import {
  categorySet,
  GetListDTO,
  regionSet,
  sortSet,
} from "interface/explore/ExplorePost";
import { useInView } from "react-intersection-observer";
import {
  setCurPage,
  setEndPoint,
} from "../../../redux/reducers/explore/explorePostReducer";
import { useSearchParams } from "react-router-dom";
import useStoreValue from "hooks/storeValue/useStoreValue";
import { setSearchText } from "../../../redux/reducers/explore/filterReducer";

const ExplorePhotoList = () => {
  const { setPostList, addPostList } = useExploreHooks();

  const isSmallScreen = useMediaQuery("(max-width : 767px)");

  const dispatch = useDispatch();

  // const [params] = useSearchParams();

  const [query, setQuery] = useSearchParams();

  const {
    storePostList,
    storeEndPoint,
    storeCurPage,
    storeCategory,
    storeRegion,
    storeSort,
    setValue,
  } = useStoreValue();

  //화면이 전부 나와야하며, 1초 딜레이
  const [ref, inView] = useInView({
    threshold: 0.8,
  });

  useEffect(() => {
    console.log("시작");
    if (storePostList === null) {
      setValue(setSearchText(query.get("search")));
      const initPostList: GetListDTO = {
        paging: 1,
        pagingNumber: 8,
        searchType: "KEYWORD",
        keyword: query.get("search"),
        sortBy: "RECENT",
        concept: query.get("concept"),
        region: query.get("region"),
      };
      setPostList(initPostList);
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    //렌더링 시작 시, 해당 view가 바로 포착되어서 .
    if (inView && !storeEndPoint && storePostList !== null) {
      console.log("추가 로딩");
      dispatch(setCurPage(storeCurPage + 1));
      addPostFunc(storeCurPage);
    }
    // eslint-disable-next-line
  }, [inView]);
  useEffect(() => {
    if (storeRegion !== null) {
      const regionNumber = storeRegion
        ? regionSet.values.indexOf(storeRegion)
        : null;
      query.set("region", regionNumber ? regionSet.key[regionNumber] : "");
      setQuery(query);
    }

    // eslint-disable-next-line
  }, [storeRegion]);

  useEffect(() => {
    if (storeCategory !== null) {
      const categoryNumber = storeCategory
        ? categorySet.values.indexOf(storeCategory)
        : null;
      query.set(
        "concept",
        categoryNumber ? categorySet.key[categoryNumber] : ""
      );
      setQuery(query);
    }

    // eslint-disable-next-line
  }, [storeCategory]);

  const addPostFunc = async (value: number) => {
    // const categoryNumber = storeCategory
    //   ? categorySet.values.indexOf(storeCategory)
    //   : null;
    // const regionNumber = storeRegion
    //   ? regionSet.values.indexOf(storeRegion)
    //   : null;
    const sortNumber = storeSort ? sortSet.values.indexOf(storeSort) : null;

    const addData: GetListDTO = {
      paging: value + 1,
      pagingNumber: 8,
      searchType: "KEYWORD",
      keyword: query.get("search") ? query.get("search") : null,
      sortBy: sortNumber !== null ? sortSet.key[sortNumber] : "RECENT",
      concept: query.get("concept") ? query.get("concept") : null,
      // region: regionNumber !== null ? regionSet.key[regionNumber] : null,
      region: query.get("region") ? query.get("region") : null,
    };

    const result = await addPostList(addData);
    if (result === 0) {
      dispatch(setEndPoint(true));
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
          storePostList.map((item) => (
            <div key={item.postId} className={styles.card}>
              <MainPhotoCard item={item} />
            </div>
          ))
        )
      ) : (
        //로딩창
        <CircularProgress color="success" />
      )}

      <div ref={ref} className={styles.wait}></div>
    </div>
  );
};

export default ExplorePhotoList;
