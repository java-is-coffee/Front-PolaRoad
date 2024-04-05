import useBucket from "hooks/bucket/useBucket";
import modalStyles from "./UserInfoModal.module.css";
import { useEffect, useState } from "react";
import getMemberInfo from "api/member/getMemberInfo";
import { IMemberInfoDetails } from "interface/member/IMemberInfoDetails";
import { IoIosArrowForward } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
import { useModal } from "hooks/modal/ModalProvider";
import ModalOption from "enum/modalOptionTypes";

const UserInfoModal = () => {
  const { getImage } = useBucket();
  const { closeModal } = useModal();
  const [memberInfo, setMemberInfo] = useState<IMemberInfoDetails>();
  const [profileImg, setProfileImg] = useState<string>("");

  useEffect(
    () => {
      const fetchMemberInfo = async () => {
        const data = await getMemberInfo();
        if (data) setMemberInfo(data);
      };
      fetchMemberInfo();
    },
    // eslint-disable-next-line
    []
  );

  useEffect(() => {
    if (!memberInfo) return;
    const fetchMemberProfileImg = async () => {
      const img = await getImage(memberInfo?.profileImage);
      if (img) setProfileImg(img);
    };
    fetchMemberProfileImg();
    // eslint-disable-next-line
  }, [memberInfo]);

  const handleClose = () => {
    closeModal(ModalOption.USER_INFO);
  };

  return (
    <div className={modalStyles.backdrop} onClick={handleClose}>
      <div
        className={modalStyles.modalContents}
        onClick={(e) => e.stopPropagation()}
      >
        <IoMdClose
          size={"24px"}
          className={modalStyles.closeButton}
          onClick={handleClose}
        />
        <div className={modalStyles.profileCard}>
          <div className={modalStyles.imgContainer}>
            <img src={profileImg} alt="프로필 이미지" />
          </div>
          <span>{memberInfo?.name}</span>
        </div>
        <section className={modalStyles.optionSection}>
          <div className={modalStyles.option}>
            <span>이름</span>
            <IoIosArrowForward />
          </div>
          <div className={modalStyles.option}>
            <span>사용자 이름</span>
            <IoIosArrowForward />
          </div>
          <div className={modalStyles.option}>
            <span>이메일</span>
            <IoIosArrowForward />
          </div>
          <div className={modalStyles.option}>
            <span>프로필 사진</span>
            <IoIosArrowForward />
          </div>
          <div className={modalStyles.option}>
            <span>비밀번호 재설정</span>
            <IoIosArrowForward />
          </div>
        </section>
      </div>
    </div>
  );
};

export default UserInfoModal;
