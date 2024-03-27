// import { ImageList, ImageListItem, ImageListItemBar } from "@mui/material";
// import MainPhotoCard from "../../card/mainPhoto/MainPhotoCard";
import { useEffect } from "react";
import MainPhotoCard from "../../card/mainPhoto/MainPhotoCard";
import styles from "./ExplorePhotoList.module.css";
import useExploreHooks from "../../../hooks/explore/useExploreHooks";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "redux/store/store";
import { CircularProgress } from "@mui/material";
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

export const initPostList: GetListDTO = {
  paging: 1,
  pagingNumber: 8,
  searchType: "KEYWORD",
  keyword: null,
  sortBy: "RECENT",
  concept: null,
  region: null,
};

const ExplorePhotoList = () => {
  const { setPostList, addPostList } = useExploreHooks();

  const dispatch = useDispatch();

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
      setPostList(initPostList);
    }

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    console.log("무한 스크롤 방지 테스트 ");
    console.log(storeCurPage);

    if (inView && !storeEndPoint) {
      dispatch(setCurPage(storeCurPage + 1));

      addPostFunc(storeCurPage);
    }
    // eslint-disable-next-line
  }, [inView, storeEndPoint]);

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
      keyword: storeSearchText,
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
    <div className={styles.photoZone}>
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
