import { useEffect, useState } from "react";
import HistoryOption from "../../../enum/historyOptionType";
import UserPhotoCard from "../../card/userPhoto/UserPhotoCard";

import gridStyle from "./UserPhotoGallery.module.css";
import getMyPostList from "api/post/getMyPostList";
import { ISinglePost } from "interface/post/ISinglePost";

interface userPhotoGalleryProps {
  option: HistoryOption;
}

function UserPhotoGallery({ option }: userPhotoGalleryProps) {
  // post const
  const [postsData, setPostsData] = useState<ISinglePost[]>([]);
  const [postPage, setPostPage] = useState<number>(1);
  const postAmount = 20;

  // album const
  // wish const
  const patchGalleryData = async () => {
    if (option === HistoryOption.POST) {
      const data = await getMyPostList(postPage, postAmount);
      if (data) {
        if (data?.maxPage > postPage) setPostPage((prev) => prev + 1);
        setPostsData((prev) => [...prev, ...data.posts]);
      }
    }
    if (option === HistoryOption.ALBUM) {
    }
    if (option === HistoryOption.WISH) {
    }
  };
  useEffect(() => {
    patchGalleryData();
  }, []);

  const renderGallery = () => {
    if (option === HistoryOption.POST) {
      return postsData.map((singlePost, index) => (
        <UserPhotoCard key={index} singlePostData={singlePost} />
      ));
    }
    if (option === HistoryOption.ALBUM) {
    }
    if (option === HistoryOption.WISH) {
    }
  };
  return <div className={gridStyle.gridGallery}>{renderGallery()}</div>;
}

export default UserPhotoGallery;
