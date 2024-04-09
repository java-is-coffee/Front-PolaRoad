import { useEffect, useState } from "react";
import gridStyle from "./UserPhotoGallery.module.css";
import { ISingleAlbum } from "interface/album/ISingleAlbum";
import getAlbumList from "api/album/getAlbumList";
import UserAlbumCard from "components/card/userAlbum/UserAlbumCard";

function AlbumGallery() {
  // album const
  const [albumData, setAlbumData] = useState<ISingleAlbum[]>([]);
  const [albumPage, setAlbumPage] = useState<number>(0);
  const [albumHasNext, setAlbumHasNext] = useState<boolean>(true);

  // wish const
  const fetchAlbumList = async () => {
    if (!albumHasNext) return;
    const data = await getAlbumList(albumPage);
    if (data) {
      console.log(data);
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
    fetchAlbumList();
    // eslint-disable-next-line
  }, []);

  return (
    <div className={gridStyle.gridGallery}>
      {albumData.map((singleAlbum, index) => (
        <UserAlbumCard key={index} singleAlbumData={singleAlbum} />
      ))}
    </div>
  );
}

export default AlbumGallery;
