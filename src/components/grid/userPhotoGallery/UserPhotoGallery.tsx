import HistoryOption from "../../../enum/historyOptionType";
import PostGallery from "./PostGallery";
import AlbumGallery from "./AlbumGallery";

interface userPhotoGalleryProps {
  option: HistoryOption;
}

function UserPhotoGallery({ option }: userPhotoGalleryProps) {
  if (option === HistoryOption.POST) {
    return <PostGallery />;
  }
  if (option === HistoryOption.ALBUM) {
    return <AlbumGallery />;
  }
  return <div></div>;
}

export default UserPhotoGallery;
