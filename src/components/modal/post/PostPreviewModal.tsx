import { useEffect, useState } from "react";
import modalStyle from "./PostPreviewModal.module.css";
import getPostDetails from "api/post/getPostDetails";
import { IPostDTO } from "interface/post/IPostDTO";
import secureLocalStorage from "react-secure-storage";
import PostMap from "components/map/PostMap";
import PostComments from "containers/post/comments/PostComments";
import { toast } from "react-toastify";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useModal } from "hooks/modal/ModalProvider";
import ModalOption from "enum/modalOptionTypes";
import PostCardListCarousel from "containers/post/postCardList/web/PostCardLIstCarousel";

interface PostPreviewModalProps {
  postId?: string;
}

function PostPreviewModal({ postId }: PostPreviewModalProps) {
  const [postDetails, setPostDetails] = useState<IPostDTO | null>(null);
  const [sideContentType, setSideContentType] = useState<string>("comment");

  const { closeModal } = useModal();
  useEffect(() => {
    const getPostData = async () => {
      if (!postId) {
        toast.error("포스트를 불러오는데 오류가 발생했습니다.");
        return;
      }
      const result = await getPostDetails(postId);
      setPostDetails(result);
    };

    if (secureLocalStorage.getItem("accessToken")) {
      getPostData();
    } else {
      toast.error("로그인이 필요합니다.");
    }
  }, [postId]);

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    setSideContentType(newAlignment);
  };

  const handleCancel = () => {
    closeModal(ModalOption.POST_PREVIEW);
  };

  return postDetails ? (
    <div className={modalStyle.backdrop} onClick={handleCancel}>
      <div className={modalStyle.modal} onClick={(e) => e.stopPropagation()}>
        <section className={modalStyle.container}>
          <article className={modalStyle.mainComponent}>
            <PostCardListCarousel
              postDetails={postDetails}
              postId={Number(postId)}
            />
          </article>
          <article className={modalStyle.sideComponent}>
            <ToggleButtonGroup
              color="success"
              value={sideContentType}
              exclusive
              onChange={handleChange}
              aria-label="Platform"
            >
              <ToggleButton value="comment">comment</ToggleButton>
              <ToggleButton value="map">map</ToggleButton>
            </ToggleButtonGroup>
            {sideContentType === "comment" ? (
              <PostComments
                postId={postId}
                memberId={postDetails.memberInfo.memberId}
              />
            ) : (
              <PostMap cards={postDetails.cards} />
            )}
          </article>
        </section>
      </div>
    </div>
  ) : (
    <div>정보를 불러올수 없습니다.</div>
  );
}

export default PostPreviewModal;
