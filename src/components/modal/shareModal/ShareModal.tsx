import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  TwitterIcon,
  TwitterShareButton,
} from "react-share";
import modalStyles from "./ShareModal.module.css";
import { useModal } from "hooks/modal/ModalProvider";
import ModalOption from "enum/modalOptionTypes";
interface ShareModalProps {
  postId: number;
}

const BASE_URL = "http://polaroad.s3-website.ap-northeast-2.amazonaws.com";

function ShareModal({ postId }: ShareModalProps) {
  const postUrl = `${BASE_URL}/post/${postId}`;
  const { closeModal } = useModal();

  const handleCancel = () => {
    closeModal(ModalOption.SHARE);
  };

  return (
    <div className={modalStyles.backdrop} onClick={handleCancel}>
      <EmailShareButton url={postUrl}>
        <EmailIcon size={48} round={true} borderRadius={24} />
      </EmailShareButton>
      <FacebookShareButton url={postUrl}>
        <FacebookIcon size={48} round={true} borderRadius={24}></FacebookIcon>
      </FacebookShareButton>
      <TwitterShareButton url={postUrl}>
        <TwitterIcon size={48} round={true} borderRadius={24}></TwitterIcon>
      </TwitterShareButton>
    </div>
  );
}

export default ShareModal;
