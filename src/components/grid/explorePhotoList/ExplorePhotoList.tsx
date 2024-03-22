// import { ImageList, ImageListItem, ImageListItemBar } from "@mui/material";
// import MainPhotoCard from "../../card/mainPhoto/MainPhotoCard";
import { useEffect, useState } from "react";
import MainPhotoCard from "../../card/mainPhoto/MainPhotoCard";
import styles from "./ExplorePhotoList.module.css";
import useExploreHooks from "../../../hooks/explore/useExploreHooks";
import { useSelector } from "react-redux";
import { RootState } from "redux/store/store";
import { CircularProgress } from "@mui/material";
import { GetListDTO } from "interface/explore/ExplorePost";
import { useInView } from "react-intersection-observer";

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

  const [curPage, setCurPage] = useState(1);

  const storePostList = useSelector(
    (state: RootState) => state.explorePost.postList
  );

  const [ref, inView] = useInView();

  useEffect(() => {
    if (storePostList === null) {
      setPostList(initPostList);
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    console.log("무한 스크롤 방지 테스트 ");
    if (inView) {
      setCurPage(curPage + 1);

      console.log("테스트 " + curPage);

      const addData: GetListDTO = {
        paging: curPage,
        pagingNumber: 8,
        searchType: "KEYWORD",
        keyword: null,
        sortBy: "RECENT",
        concept: null,
        region: null,
      };

      addPostList(addData);
    }
    // eslint-disable-next-line
  }, [inView]);

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
              <MainPhotoCard key={item.postId} item={item} />
            </div>
          ))
        )
      ) : (
        //로딩창
        <CircularProgress color="success" />
      )}

      <div ref={ref} className={styles.wait}>
        <CircularProgress color="success" />
      </div>
    </div>
  );
};

export default ExplorePhotoList;
