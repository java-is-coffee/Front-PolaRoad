// import { ImageList, ImageListItem, ImageListItemBar } from "@mui/material";
// import MainPhotoCard from "../../card/mainPhoto/MainPhotoCard";
import MainPhotoCard, { PhotoData } from "../../card/mainPhoto/MainPhotoCard";
import styles from "./ExplorePhotoList.module.css";

const testDATA: PhotoData[] = [
  {
    title: "맛집 탐방",
    nickname: "DIO",
    goodNumber: 1,
    concept: "FOOD",
    region: "SEOUL",
    images: ["https://images.unsplash.com/photo-1551963831-b3b1ca40c98e"],
  },
  {
    title: "맛집 탐방",
    nickname: "DIO",
    goodNumber: 2,
    concept: "FOOD",
    region: "SEOUL",
    images: ["https://images.unsplash.com/photo-1551782450-a2132b4ba21d"],
  },
  {
    title: "맛집 탐방",
    nickname: "DIO",
    goodNumber: 3,
    concept: "FOOD",
    region: "SEOUL",
    images: ["https://images.unsplash.com/photo-1522770179533-24471fcdba45"],
  },
  {
    title: "맛집 탐방",
    nickname: "DIO",
    goodNumber: 4,
    concept: "FOOD",
    region: "SEOUL",
    images: ["https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c"],
  },
  {
    title: "맛집 탐방",
    nickname: "DIO",
    goodNumber: 5,
    concept: "FOOD",
    region: "SEOUL",
    images: ["https://images.unsplash.com/photo-1533827432537-70133748f5c8"],
  },
  {
    title: "맛집 탐방",
    nickname: "DIO",
    goodNumber: 6,
    concept: "FOOD",
    region: "SEOUL",
    images: ["https://images.unsplash.com/photo-1558642452-9d2a7deb7f62"],
  },
  {
    title: "맛집 탐방",
    nickname: "DIO",
    goodNumber: 7,
    concept: "FOOD",
    region: "SEOUL",
    images: ["https://images.unsplash.com/photo-1516802273409-68526ee1bdd6"],
  },
  {
    title: "맛집 탐방",
    nickname: "DIO",
    goodNumber: 8,
    concept: "FOOD",
    region: "SEOUL",
    images: ["https://images.unsplash.com/photo-1518756131217-31eb79b20e8f"],
  },
  {
    title: "맛집 탐방",
    nickname: "DIO",
    goodNumber: 9,
    concept: "FOOD",
    region: "SEOUL",
    images: ["https://images.unsplash.com/photo-1597645587822-e99fa5d45d25"],
  },
  {
    title: "맛집 탐방",
    nickname: "DIO",
    goodNumber: 10,
    concept: "FOOD",
    region: "SEOUL",
    images: ["https://images.unsplash.com/photo-1567306301408-9b74779a11af"],
  },
  {
    title: "맛집 탐방",
    nickname: "DIO",
    goodNumber: 11,
    concept: "FOOD",
    region: "SEOUL",
    images: ["https://images.unsplash.com/photo-1471357674240-e1a485acb3e1"],
  },
  {
    title: "맛집 탐방",
    nickname: "DIO",
    goodNumber: 12,
    concept: "FOOD",
    region: "SEOUL",
    images: ["https://images.unsplash.com/photo-1589118949245-7d38baf380d6"],
  },
];

/* <ImageList
        sx={{
          width: "95vw",
          height: 450,
        }}
        cols={4}
      >
        {itemData.map((item) => (
          <ImageListItem key={item.img}>
            <img
              srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
              src={`${item.img}?w=248&fit=crop&auto=format`}
              alt={item.title}
              loading="lazy"
            />
            <ImageListItemBar
              title={item.title}
              subtitle={<span>by: {item.author}</span>}
              position="below"
            />
          </ImageListItem>
        ))}
      </ImageList> */

const ExplorePhotoList = () => {
  return (
    <div className={styles.photoZone}>
      {testDATA.map((item) => (
        <MainPhotoCard key={item.images[0]} item={item} />
      ))}
    </div>
  );
};

export default ExplorePhotoList;
