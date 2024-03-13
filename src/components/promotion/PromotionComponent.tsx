/* 데이터 처리: 일반적으로 외부에서 데이터를 props로 받아와서 표시, 자체적으로 데이터를 가져오거나 관리하는 로직을 최소화
예시: 버튼, 입력 필드, 아이템 리스트의 각 아이템 등 */

import componentStyles from "./PromotionComponent.module.css";

function PromotionContainer() {
  return (
    <>
      <div className={componentStyles.promotionContainer}>
        <div className={componentStyles.mainText}>Wherever You Want</div>
      </div>
      <div className={componentStyles.videoContainer}>
        <video controls>
          <source src="path_to_your_video.mp4" type="video/mp4"/>
          Your browser does not support the video tag.
        </video>
      </div>
    </>
  );
}

export default PromotionContainer;



