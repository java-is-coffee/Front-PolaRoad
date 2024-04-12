import useBucket from "hooks/bucket/useBucket";
import modalStyles from "./UserInfoModal.module.css";
import { useEffect, useState } from "react";
import getMemberInfo from "api/member/getMemberInfo";
import { IMemberInfoDetails } from "interface/member/IMemberInfoDetails";
import { IoIosArrowForward } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
import { useModal } from "hooks/modal/ModalProvider";
import ModalOption from "enum/modalOptionTypes";
import EditMemberInfoForm, {
  formType,
} from "components/form/member/EditMemberInfoForm";

const UserInfoModal = () => {
  const { getImage } = useBucket();
  const { openModal, closeModal } = useModal();
  const [memberInfo, setMemberInfo] = useState<IMemberInfoDetails>();
  const [profileImg, setProfileImg] = useState<string>("");
  const [editFormType, setEditFomType] = useState<formType | null>(null);

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

  const handleReturnDefault = () => {
    setEditFomType(null);
  };

  const handleEditProfileImg = () => {
    openModal(ModalOption.EDIT_PROFILE_IMG);
  };

  if (!memberInfo) return <div></div>;

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
        {!editFormType ? (
          <div className={modalStyles.defaultContents}>
            <div className={modalStyles.profileCard}>
              <div
                className={modalStyles.imgContainer}
                onClick={handleEditProfileImg}
              >
                <img src={profileImg} alt="프로필 이미지" />
              </div>
              <span>{memberInfo?.name}</span>
              <span style={{fontSize:"10px", color: "gray", marginTop: "3px"}}>PolaRoad</span>
            </div>
            <section className={modalStyles.optionSection}>
              <div
                className={modalStyles.option}
                onClick={() => setEditFomType("name")}
              >
                <span>이름</span>
                <IoIosArrowForward />
              </div>
              <div
                className={modalStyles.option}
                onClick={() => setEditFomType("nickname")}
              >
                <span>사용자 이름</span>
                <IoIosArrowForward />
              </div>
              <div
                className={modalStyles.option}
                onClick={() => setEditFomType("email")}
              >
                <span>이메일</span>
                <IoIosArrowForward />
              </div>
              <div
                className={modalStyles.option}
                onClick={handleEditProfileImg}
              >
                <span>프로필 사진</span>
                <IoIosArrowForward />
              </div>
              <div
                className={modalStyles.option}
                onClick={() => setEditFomType("password")}
              >
                <span>비밀번호 재설정</span>
                <IoIosArrowForward />
              </div>
            </section>
          </div>
        ) : (
          <EditMemberInfoForm
            type={editFormType}
            memberInfo={memberInfo}
            handleReturnDefault={handleReturnDefault}
          />
        )}
      </div>
    </div>
  );
};

export default UserInfoModal;
