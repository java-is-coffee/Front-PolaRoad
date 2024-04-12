import modalStyles from "./DeleteWarningModal.module.css";
import { useModal } from "../../../../hooks/modal/ModalProvider";
import ModalOption from "../../../../enum/modalOptionTypes";
import deleteAlbum from "api/album/deleteAlbum";
import { toast } from "react-toastify";
import deleteWishList from "api/wishlist/deleteWishsList";

interface DeleteWarningModalProps {
  type?: "album" | "wishList";
  targetId?: number;
}

const DeleteWarningModal = ({ type, targetId }: DeleteWarningModalProps) => {
  const { closeModal } = useModal();
  const title =
    type === "album"
      ? "앨범을 삭제하시겠어요?"
      : "위시리스트를 삭제하시겠어요?";
  const description = "삭제한 후에는 되돌릴 수 없습니다.";
  if (!targetId) return <div></div>;

  const fetchDeleteAlbum = async () => {
    const result = await deleteAlbum(targetId);
    if (result) {
      toast.info("삭제되었습니다.");
    } else {
      toast.error("삭제하는 도중 오류가 발생했습니다.");
    }
  };

  const fetchDeleteWishList = async () => {
    const result = await deleteWishList(targetId);
    if (result) {
      toast.info("삭제되었습니다.");
    } else {
      toast.error("삭제하는 도중 오류가 발생했습니다.");
    }
  };

  const handleExit = () => {
    if (type === "album") {
      fetchDeleteAlbum();
      closeModal(ModalOption.DELETE_WARNING);
      closeModal(ModalOption.AlBUM_PREVIEW);
    } else if (type === "wishList") {
      fetchDeleteWishList();
      closeModal(ModalOption.DELETE_WARNING);
    }
  };

  const handleCancel = () => {
    closeModal(ModalOption.DELETE_WARNING); // 경고 모달만 닫음
  };

  return (
    <div className={modalStyles.backdrop}>
      <div className={modalStyles.deleteWarningModalContainer}>
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

export default DeleteWarningModal;
