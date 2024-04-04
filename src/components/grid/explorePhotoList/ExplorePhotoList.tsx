// import { ImageList, ImageListItem, ImageListItemBar } from "@mui/material";
// import MainPhotoCard from "../../card/mainPhoto/MainPhotoCard";
import { useEffect } from "react";
import MainPhotoCard from "../../card/mainPhoto/MainPhotoCard";
import styles from "./ExplorePhotoList.module.css";
import useExploreHooks from "../../../hooks/explore/useExploreHooks";
import { useDispatch } from "react-redux";
import { CircularProgress, useMediaQuery } from "@mui/material";
import {
  conceptSet,
  GetListDTO,
  PostData,
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
import useCustomParam from "hooks/explore/useCustomParam";

const ExplorePhotoList = () => {
  const { setPostList, addPostList } = useExploreHooks();

  const isSmallScreen = useMediaQuery("(max-width : 767px)");

  const dispatch = useDispatch();

  const [query, setQuery] = useSearchParams();

  const {
    storePostList,
    storeEndPoint,
    storeCurPage,
    storeConcept,
    storeRegion,
    storeSort,
    setValue,
  } = useStoreValue();

  //화면이 전부 나와야하며, 1초 딜레이
  const [ref, inView] = useInView({
    threshold: 0.8,
  });

  const { getContent } = useCustomParam();

  useEffect(() => {
    console.log("시작");
    if (query.get("region") !== null) getContent("region");
    if (query.get("concept") !== null) getContent("concept");
    if (query.get("sort") !== null) getContent("sort");

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
  }, [storePostList]);

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
      query.set(
        "region",
        regionNumber !== null ? regionSet.key[regionNumber] : ""
      );
      setQuery(query);
    } else {
      query.delete("region");
      setQuery(query);
    }

    // eslint-disable-next-line
  }, [storeRegion]);

  useEffect(() => {
    if (storeConcept !== null) {
      const categoryNumber = storeConcept
        ? conceptSet.values.indexOf(storeConcept)
        : null;
      query.set(
        "concept",
        categoryNumber !== null ? conceptSet.key[categoryNumber] : ""
      );
      setQuery(query);
    } else {
      query.delete("concept");
      setQuery(query);
    }

    // eslint-disable-next-line
  }, [storeConcept]);

  useEffect(() => {
    if (storeSort !== null) {
      const sortNumber = storeSort ? sortSet.values.indexOf(storeSort) : null;
      query.set(
        "sort",
        sortNumber !== null ? sortSet.key[sortNumber] : "RECENT"
      );
      setQuery(query);
    } else {
      query.delete("sort");
      setQuery(query);
    }
    // eslint-disable-next-line
  }, [storeSort]);

  const addPostFunc = async (value: number) => {
    const addData: GetListDTO = {
      paging: value + 1,
      pagingNumber: 8,
      searchType: "KEYWORD",
      keyword: query.get("search") ? query.get("search") : null,
      sortBy: query.get("sort") ? query.get("sort") : "RECENT",
      concept: query.get("concept") ? query.get("concept") : null,
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
          storePostList.map((item: PostData) => (
            <div key={item.postId} className={styles.card}>
              <MainPhotoCard item={item} />
            </div>
          ))
        )
      ) : (
        //로딩창
        <CircularProgress color="success" />
      )}

      <div ref={ref} className={styles.wait}>
        Footer
      </div>
    </div>
  );
};

export default ExplorePhotoList;
