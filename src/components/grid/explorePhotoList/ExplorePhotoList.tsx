// import { ImageList, ImageListItem, ImageListItemBar } from "@mui/material";
// import MainPhotoCard from "../../card/mainPhoto/MainPhotoCard";
import { useEffect } from "react";
import MainPhotoCard from "../../card/mainPhoto/MainPhotoCard";
import styles from "./ExplorePhotoList.module.css";
import useExploreHooks from "../../../hooks/explore/useExploreHooks";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "redux/store/store";
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

const ExplorePhotoList = () => {
  const { setPostList, addPostList } = useExploreHooks();

  const isSmallScreen = useMediaQuery("(max-width : 767px)");

  const dispatch = useDispatch();

  const [params] = useSearchParams();

  const storePostList = useSelector(
    (state: RootState) => state.explorePost.postList
  );

  const storeEndPoint = useSelector(
    (state: RootState) => state.explorePost.endPoint
  );

  const storeCategory = useSelector(
    (state: RootState) => state.filter.activeCategory
  );
  const storeRegion = useSelector(
    (state: RootState) => state.filter.activeRegion
  );
  const storeSort = useSelector((state: RootState) => state.filter.activeSort);
  const storeCurPage = useSelector(
    (state: RootState) => state.explorePost.curPage
  );

  const storeSearchText = useSelector(
    (state: RootState) => state.explorePost.searchText
  );

  //화면이 전부 나와야하며, 1초 딜레이
  const [ref, inView] = useInView({
    threshold: 1,
  });

  useEffect(() => {
    if (storePostList === null) {
      const initPostList: GetListDTO = {
        paging: 1,
        pagingNumber: 8,
        searchType: "KEYWORD",
        keyword: storeSearchText,
        sortBy: "RECENT",
        concept: null,
        region: null,
      };

      setPostList(initPostList);
    } else if (inView && !storeEndPoint) {
      dispatch(setCurPage(storeCurPage + 1));

      addPostFunc(storeCurPage);
    }
    // eslint-disable-next-line
  }, [inView]);

  const addPostFunc = async (value: number) => {
    const categoryNumber = storeCategory
      ? categorySet.values.indexOf(storeCategory)
      : null;
    const regionNumber = storeRegion
      ? regionSet.values.indexOf(storeRegion)
      : null;
    const sortNumber = storeSort ? sortSet.values.indexOf(storeSort) : null;

    const addData: GetListDTO = {
      paging: value + 1,
      pagingNumber: 8,
      searchType: "KEYWORD",
      keyword: params.get("search"),
      sortBy: sortNumber !== null ? sortSet.key[sortNumber] : "RECENT",
      concept: categoryNumber !== null ? categorySet.key[categoryNumber] : null,
      region: regionNumber !== null ? regionSet.key[regionNumber] : null,
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
