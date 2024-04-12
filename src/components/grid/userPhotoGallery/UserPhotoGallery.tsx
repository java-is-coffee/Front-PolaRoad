import HistoryOption from "../../../enum/historyOptionType";
import PostGallery from "./PostGallery";
import AlbumGallery from "./AlbumGallery";
import WishListGrid from "./wishLIstGrid/WishListGrid";

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
  if (option === HistoryOption.WISH) {
    return <WishListGrid />;
  }
  return <div></div>;
}

export default UserPhotoGallery;
