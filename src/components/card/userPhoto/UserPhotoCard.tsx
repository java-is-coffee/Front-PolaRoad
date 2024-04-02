import { ISinglePost } from "interface/post/ISinglePost";
import cardStyles from "./UserPhotoCard.module.css";
import useBucket from "hooks/bucket/useBucket";
import { useEffect, useState } from "react";
import { IoIosPhotos } from "react-icons/io";
import { useModal } from "hooks/modal/ModalProvider";
import ModalOption from "enum/modalOptionTypes";

interface userPhotoCardProps {
  singlePostData?: ISinglePost;
}

function UserPhotoCard({ singlePostData }: userPhotoCardProps) {
  const { getImage } = useBucket();
  const [thumbnailUrl, setThumbnailUrl] = useState<string>("");
  const { openModal } = useModal();
  useEffect(() => {
    if (singlePostData) {
      const getImgUrl = async () => {
        const url = await getImage(singlePostData?.images[0]);
        if (!url) setThumbnailUrl("/basic/photo.png");
        else setThumbnailUrl(url);
      };
      getImgUrl();
    }
    // eslint-disable-next-line
  }, []);
  const handleClickCard = () => {
    openModal(ModalOption.POST_PREVIEW, { postId: singlePostData?.postId });
  };
  return (
    <div className={cardStyles.imgContainer} onClick={handleClickCard}>
      {singlePostData && singlePostData?.images.length > 1 && (
        <IoIosPhotos className={cardStyles.photoLayer} size={"20px"} />
      )}
      <img className={cardStyles.img} src={thumbnailUrl} alt="userImg" />
    </div>
  );
}

export default UserPhotoCard;
