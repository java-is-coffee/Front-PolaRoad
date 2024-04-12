import React from "react";
import modalStyles from "./DeleteAlbumModal.module.css";
import { useModal } from "../../../../hooks/modal/ModalProvider";
import ModalOption from "../../../../enum/modalOptionTypes";
import deleteAlbum from "api/album/deleteAlbum";
import { toast } from "react-toastify";

interface DeleteAlbumModalProps {
  albumId?: number;
}

const DeleteAlbumModal = ({ albumId }: DeleteAlbumModalProps) => {
  const { closeModal } = useModal();

  const title = "앨범을 삭제하시겠어요?";
  const description = "삭제한 후에는 되돌릴 수 없습니다.";

  if (!albumId) return <div></div>;

  const handleExit = () => {
    const fetchDeleteAlbum = async () => {
      const result = await deleteAlbum(albumId);
      if (result) {
        toast.info("삭제되었습니다.");
      } else {
        toast.error("삭제하는 도중 오류가 발생했습니다.");
      }
    };
    fetchDeleteAlbum();
    closeModal(ModalOption.AlBUM_DELETE);
    closeModal(ModalOption.AlBUM_PREVIEW);
  };

  const handleCancel = () => {
    closeModal(ModalOption.AlBUM_DELETE); // 경고 모달만 닫음
  };

  return (
    <div className={modalStyles.backdrop}>
      <div className={modalStyles.deleteAlbumModalContainer}>
        <h2>{title}</h2>
        <p>{description}</p>
        <button className={modalStyles.delete} onClick={handleExit}>
          삭제
        </button>
        <button className={modalStyles.cancel} onClick={handleCancel}>
          취소
        </button>
      </div>
    </div>
  );
};

export default DeleteAlbumModal;
