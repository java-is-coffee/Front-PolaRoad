// import { ImageList, ImageListItem, ImageListItemBar } from "@mui/material";
// import MainPhotoCard from "../../card/mainPhoto/MainPhotoCard";
import { useEffect } from "react";
import MainPhotoCard from "../../card/mainPhoto/MainPhotoCard";
import styles from "./ExplorePhotoList.module.css";
import useExploreHooks from "../../../hooks/explore/useExploreHooks";
import { GetListDTO } from "api/explore/getPostList";
import { useSelector } from "react-redux";
import { RootState } from "redux/store/store";
import { CircularProgress } from "@mui/material";

// const testDATA: PhotoData[] = [
//   {
//     title: "맛집 탐방",
//     nickname: "DIO",
//     goodNumber: 1,
//     concept: "FOOD",
//     region: "SEOUL",
//     images: ["https://images.unsplash.com/photo-1551963831-b3b1ca40c98e"],
//   },
//   {
//     title: "맛집 탐방",
//     nickname: "DIO",
//     goodNumber: 2,
//     concept: "FOOD",
//     region: "SEOUL",
//     images: ["https://images.unsplash.com/photo-1551782450-a2132b4ba21d"],
//   },
//   {
//     title: "맛집 탐방",
//     nickname: "DIO",
//     goodNumber: 3,
//     concept: "FOOD",
//     region: "SEOUL",
//     images: ["https://images.unsplash.com/photo-1522770179533-24471fcdba45"],
//   },
//   {
//     title: "맛집 탐방",
//     nickname: "DIO",
//     goodNumber: 4,
//     concept: "FOOD",
//     region: "SEOUL",
//     images: ["https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c"],
//   },
//   {
//     title: "맛집 탐방",
//     nickname: "DIO",
//     goodNumber: 5,
//     concept: "FOOD",
//     region: "SEOUL",
//     images: ["https://images.unsplash.com/photo-1533827432537-70133748f5c8"],
//   },
//   {
//     title: "맛집 탐방",
//     nickname: "DIO",
//     goodNumber: 6,
//     concept: "FOOD",
//     region: "SEOUL",
//     images: ["https://images.unsplash.com/photo-1558642452-9d2a7deb7f62"],
//   },
//   {
//     title: "맛집 탐방",
//     nickname: "DIO",
//     goodNumber: 7,
//     concept: "FOOD",
//     region: "SEOUL",
//     images: ["https://images.unsplash.com/photo-1516802273409-68526ee1bdd6"],
//   },
//   {
//     title: "맛집 탐방",
//     nickname: "DIO",
//     goodNumber: 8,
//     concept: "FOOD",
//     region: "SEOUL",
//     images: ["https://images.unsplash.com/photo-1518756131217-31eb79b20e8f"],
//   },
//   {
//     title: "맛집 탐방",
//     nickname: "DIO",
//     goodNumber: 9,
//     concept: "FOOD",
//     region: "SEOUL",
//     images: ["https://images.unsplash.com/photo-1597645587822-e99fa5d45d25"],
//   },
//   {
//     title: "맛집 탐방",
//     nickname: "DIO",
//     goodNumber: 10,
//     concept: "FOOD",
//     region: "SEOUL",
//     images: ["https://images.unsplash.com/photo-1567306301408-9b74779a11af"],
//   },
//   {
//     title: "맛집 탐방",
//     nickname: "DIO",
//     goodNumber: 11,
//     concept: "FOOD",
//     region: "SEOUL",
//     images: ["https://images.unsplash.com/photo-1471357674240-e1a485acb3e1"],
//   },
//   {
//     title: "맛집 탐방",
//     nickname: "DIO",
//     goodNumber: 12,
//     concept: "FOOD",
//     region: "SEOUL",
//     images: ["https://images.unsplash.com/photo-1589118949245-7d38baf380d6"],
//   },
// ];
const initPostList: GetListDTO = {
  paging: 0,
  pagingNumber: 12,
  searchType: "KEYWORD",
  sortBy: "RECENT",
  concept: null,
  region: null,
};

const ExplorePhotoList = () => {
  const { initList } = useExploreHooks();
  const storePostList = useSelector(
    (state: RootState) => state.explorePost.postList
  );

  useEffect(() => {
    if (storePostList === null) {
      initList(initPostList);
    }
  }, [storePostList, initList]);

  return (
    <div className={styles.photoZone}>
      {storePostList ? (
        storePostList.map((item) => (
          <MainPhotoCard key={item.postId} item={item} />
        ))
      ) : (
        <CircularProgress color="success" />
      )}
    </div>
  );
};

export default ExplorePhotoList;
