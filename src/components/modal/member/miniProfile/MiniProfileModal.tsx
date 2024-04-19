import MiniProfile from "containers/miniProfile/MiniProfile";
import modalStyles from "./MiniProfileModal.module.css";
import { useEffect, useState } from "react";
import getOtherMemberInfo from "api/member/getOtherMemberInfo";
import { IOtherMemberInfo } from "interface/member/IOtherMemberInfo";
import { useModal } from "hooks/modal/ModalProvider";
import useBucket from "hooks/bucket/useBucket";
import ModalOption from "enum/modalOptionTypes";
import { IoMdClose } from "react-icons/io";

interface MiniProfileModalProps {
  memberId?: number;
}

const MiniProfileModal = ({ memberId }: MiniProfileModalProps) => {
  const { closeModal } = useModal();
  const { getImage } = useBucket();
  const [memberInfo, setMemberInfo] = useState<IOtherMemberInfo>();
  useEffect(
    () => {
      if (!memberId) return;
      const fetchMemberInfo = async () => {
        const data = await getOtherMemberInfo(memberId);
        if (data) setMemberInfo(data);
      };
      fetchMemberInfo();
    },
    //eslint-disable-next-line
    []
  );

  const handleCloseModal = () => {
    closeModal(ModalOption.OTHER_MEMBER_INFO);
  };
  return (
    <div className={modalStyles.previewBackdrop} onClick={handleCloseModal}>
      <div
        className={modalStyles.previewModal}
        onClick={(e) => e.stopPropagation()}
      >
        <IoMdClose size={"24px"} className={modalStyles.closeButton} />
        {memberInfo && <MiniProfile memberInfo={memberInfo} />}
      </div>
    </div>
  );
};

export default MiniProfileModal;
