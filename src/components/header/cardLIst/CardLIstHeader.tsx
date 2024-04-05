import useBucket from "hooks/bucket/useBucket";
import { IMemberInfo } from "interface/member/IMemberInfo";
import { useEffect, useState } from "react";
import { IoIosMore } from "react-icons/io";

import headerStyles from "./CardListHeader.module.css";
import { useModal } from "hooks/modal/ModalProvider";
import ModalOption from "enum/modalOptionTypes";

interface CarsListHeaderProps {
  memberInfo: IMemberInfo;
  postId: number;
}

function CardListHeader({ memberInfo, postId }: CarsListHeaderProps) {
  const { getImage } = useBucket();
  const [profileImg, setProfileImg] = useState<string>();
  const { openModal } = useModal();

  useEffect(() => {
    if (!memberInfo.profileImage) return;
    const fetchUserProfileImg = async () => {
      const result = await getImage(memberInfo.profileImage);
      if (result) setProfileImg(result);
    };
    fetchUserProfileImg();
    // eslint-disable-next-line
  }, []);

  const handleOptionClick = () => {
    openModal(ModalOption.POST_OPTION, { postId: postId });
  };

  return (
    <div className={headerStyles.header}>
      <div className={headerStyles.profile}>
        <div className={headerStyles.profileImg}>
          {profileImg ? (
            <img src={profileImg} alt="유저 이미지" />
          ) : (
            <img src="/basic/profile.png" alt="default profile" />
          )}
        </div>
        <span>{memberInfo.nickname}</span>
      </div>
      <IoIosMore
        size={"24px"}
        onClick={handleOptionClick}
        style={{ cursor: "pointer" }}
      />
    </div>
  );
}

export default CardListHeader;
