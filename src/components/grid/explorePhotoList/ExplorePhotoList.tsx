// import { ImageList, ImageListItem, ImageListItemBar } from "@mui/material";
// import MainPhotoCard from "../../card/mainPhoto/MainPhotoCard";
import { useEffect, useState } from "react";
import MainPhotoCard from "../../card/mainPhoto/MainPhotoCard";
import styles from "./ExplorePhotoList.module.css";
import useExploreHooks from "../../../hooks/explore/useExploreHooks";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "redux/store/store";
import { CircularProgress } from "@mui/material";
import { categorySet, GetListDTO } from "interface/explore/ExplorePost";
import { useInView } from "react-intersection-observer";
import { setCurPage } from "../../../redux/reducers/explore/explorePostReducer";

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

  // const [curPage, setCurPage] = useState(1);
  const [endPoint, setEndPoint] = useState(false);
  const dispatch = useDispatch();

  const storePostList = useSelector(
    (state: RootState) => state.explorePost.postList
  );

  const storeCategory = useSelector(
    (state: RootState) => state.filter.activeCategory
  );
  // const storeRegion = useSelector(
  //   (state: RootState) => state.filter.activeRegion
  // );
  // const storeSort = useSelector((state: RootState) => state.filter.activeSort);
  const curPage = useSelector((state: RootState) => state.explorePost.curPage);

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
    console.log(curPage);

    if (inView && !endPoint) {
      dispatch(setCurPage(curPage + 1));

      addPostFunc(curPage);
    }
    // eslint-disable-next-line
  }, [inView]);

  const addPostFunc = async (value: number) => {
    if (storeCategory) {
      const number = categorySet.values.indexOf(storeCategory);
      const addData: GetListDTO = {
        paging: value + 1,
        pagingNumber: 8,
        searchType: "KEYWORD",
        keyword: null,
        sortBy: "RECENT",
        concept: categorySet.key[number],
        region: null,
      };

      const result = await addPostList(addData);
      if (result === 0) {
        setEndPoint(true);
      }
    } else {
      const addData: GetListDTO = {
        paging: value + 1,
        pagingNumber: 8,
        searchType: "KEYWORD",
        keyword: null,
        sortBy: "RECENT",
        concept: null,
        region: null,
      };

      const result = await addPostList(addData);
      if (result === 0) {
        setEndPoint(true);
      }
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
            <div key={item.postId + "xx"} className={styles.card}>
              <MainPhotoCard item={item} />
            </div>
          ))
        )
      ) : (
        //로딩창
        <CircularProgress color="success" />
      )}

      <div ref={ref} className={styles.wait}>
        테스트?ActionBtn
      </div>
    </div>
  );
};

export default ExplorePhotoList;
