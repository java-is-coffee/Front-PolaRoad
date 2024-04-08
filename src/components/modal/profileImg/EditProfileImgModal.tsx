import ModalOption from "enum/modalOptionTypes";
import { useModal } from "hooks/modal/ModalProvider";
import modalStyles from "./EditProfileImgModal.module.css";
import patchMemberInfo from "api/member/patchMemberInfo";
import useBucket from "hooks/bucket/useBucket";
import { toast } from "react-toastify";
import { IUploadImage } from "interface/bucket/IUploadImage";
import getMemberInfo from "api/member/getMemberInfo";
import { IMemberEditInfoDTO } from "interface/member/IMemberInfoDetails";

const EditProfileImgModal = () => {
  const { closeModal } = useModal();
  const { uploadImage } = useBucket();
  const handleCancel = () => {
    closeModal(ModalOption.EDIT_PROFILE_IMG);
  };
  const handleImgUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!event.target.files || event.target.files.length === 0) {
      return;
    }
    const memberInfo = await getMemberInfo();
    if (memberInfo) {
      const newFile = event.target.files[0];
      const fileInfo: IUploadImage = {
        postUserId: memberInfo.memberId,
        image: newFile,
      };
      const imgUrl: string | null = await uploadImage({
        type: "PROFILE",
        imageInfo: fileInfo,
      });
      if (imgUrl) {
        const result: IMemberEditInfoDTO | null = await patchMemberInfo({
          profileImage: imgUrl,
        });
        result ? toast.info("업로드 성공") : toast.error("업로드 실패");
        handleCancel();
      }
    }
  };

  const handleImgDelete = () => {
    patchMemberInfo({ profileImage: "" });
    handleCancel();
  };
  return (
    <div className={modalStyles.backdrop} onClick={handleCancel}>
      <div
        className={modalStyles.modalContents}
        onClick={(e) => e.stopPropagation()}
      >
        <h2>프로필 이미지 편집</h2>
        <hr className={modalStyles.divider} />
        <label htmlFor={`profile-img`} className={modalStyles.inputLabel}>
          <div className={modalStyles.uploadBtn}>파일 업로드하기</div>
        </label>
        <input
          type="file"
          name={`profile-img`}
          id={`profile-img`}
          accept="image/*"
          onChange={handleImgUpload}
          style={{ display: "none" }}
          required
        />
        <hr className={modalStyles.divider} />
        <button className={modalStyles.delete} onClick={handleImgDelete}>
          이미지 삭제
        </button>
        <hr className={modalStyles.divider} />
        <button className={modalStyles.cancel} onClick={handleCancel}>
          취소
        </button>
      </div>
    </div>
  );
};

export default EditProfileImgModal;
