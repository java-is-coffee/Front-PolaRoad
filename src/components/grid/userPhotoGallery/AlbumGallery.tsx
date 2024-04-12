import { useEffect, useRef, useState } from "react";
import gridStyle from "./UserPhotoGallery.module.css";
import { ISingleAlbum } from "interface/album/ISingleAlbum";
import getAlbumList from "api/album/getAlbumList";
import UserAlbumCard from "components/card/userAlbum/UserAlbumCard";

function AlbumGallery() {
  // album const
  const [albumData, setAlbumData] = useState<ISingleAlbum[]>([]);
  const [albumPage, setAlbumPage] = useState<number>(0);
  const [albumHasNext, setAlbumHasNext] = useState<boolean>(true);
  const observer = useRef<IntersectionObserver>();
  const lastAlbumElementRef = useRef(null); // 감시할 요소의 ref

  // wish const
  const fetchAlbumList = async () => {
    if (!albumHasNext) return;
    const data = await getAlbumList(albumPage);
    if (data) {
      data.hasNext ? setAlbumPage((prev) => prev + 1) : setAlbumHasNext(false);
      const newAlbums = data.albumList.filter(
        (newAlbum) =>
          !albumData.some(
            (existingAlbum) => existingAlbum.albumId === newAlbum.albumId
          )
      );
      setAlbumData((prev) => [...prev, ...newAlbums]);
    }
  };

  useEffect(() => {
    observer.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && albumHasNext) {
          fetchAlbumList();
        }
      },
      { threshold: 0.1 }
    );

    if (lastAlbumElementRef.current) {
      observer.current.observe(lastAlbumElementRef.current);
    }

    return () => observer.current?.disconnect();
    // eslint-disable-next-line
  }, [albumPage, albumHasNext]);

  return (
    <div className={gridStyle.gridGallery}>
      {albumData.map((singleAlbum, index) => (
        <UserAlbumCard key={index} singleAlbumData={singleAlbum} />
      ))}
      <div ref={lastAlbumElementRef} />
    </div>
  );
}

export default AlbumGallery;
