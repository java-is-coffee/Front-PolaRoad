import modalStyles from "./PostOptionModal.module.css";
import { useModal } from "../../../hooks/modal/ModalProvider";
import ModalOption from "../../../enum/modalOptionTypes";
import postFollowMember from "api/follow/postFollowMember";
import { toast } from "react-toastify";
import secureLocalStorage from "react-secure-storage";

interface PostOptionModalProps {
  memberId?: number;
  postId?: number;
}

const BASE_URL = "http://polaroad.s3-website.ap-northeast-2.amazonaws.com";

const PostOptionModal = ({ memberId, postId }: PostOptionModalProps) => {
  const { openModal, closeModal } = useModal();
  const hostMemberId = secureLocalStorage.getItem("member");

  if (!memberId) return <div></div>;
  // "취소" 버튼 클릭 시 실행될 함수
  const handleCancel = () => {
    closeModal(ModalOption.POST_OPTION); // 경고 모달을 닫음
  };

  const handleFollow = async () => {
    const result = await postFollowMember(memberId);
    if (result) closeModal(ModalOption.POST_OPTION);
  };

  // 현재 페이지의 URL을 클립보드에 복사하는 함수
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(`${BASE_URL}/post/${postId}`);
      toast.info("클립보드에 복사되었습니다.");
    } catch (err) {
      toast.error("복사에 실패했습니다.");
    }
  };

  const handleShare = () => {
    openModal(ModalOption.SHARE, { postId: postId });
  };

  const handleAddWish = () => {
    openModal(ModalOption.ADD_TO_WISH, { postId: postId });
  };

  const handleDeletePost = () => {
    openModal(ModalOption.DELETE_WARNING, { type: "post", targetId: postId });
  };

  return (
    <div className={modalStyles.backdrop} onClick={handleCancel}>
      <div
        className={modalStyles.postOptionModal}
        onClick={(e) => e.stopPropagation()}
      >
        <button className={modalStyles.report}>신고</button>
        {hostMemberId && hostMemberId === memberId && (
          <button className={modalStyles.edit}>포스트 수정</button>
        )}
        {hostMemberId && hostMemberId === memberId && (
          <button className={modalStyles.delete} onClick={handleDeletePost}>
            삭제
          </button>
        )}
        <button className={modalStyles.option} onClick={handleFollow}>
          팔로우
        </button>
        <button className={modalStyles.option} onClick={handleAddWish}>
          위시리스트에 추가
        </button>
        <button className={modalStyles.option} onClick={handleShare}>
          공유
        </button>
        <button className={modalStyles.option} onClick={handleCopyLink}>
          링크 복사
        </button>
        <button className={modalStyles.option}>계정 정보</button>
        <button className={modalStyles.option} onClick={handleCancel}>
          취소
        </button>
      </div>
    </div>
  );
};

export default PostOptionModal;
