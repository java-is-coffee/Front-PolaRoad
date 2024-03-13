/* 데이터 처리: 일반적으로 외부에서 데이터를 props로 받아와서 표시, 자체적으로 데이터를 가져오거나 관리하는 로직을 최소화
예시: 버튼, 입력 필드, 아이템 리스트의 각 아이템 등 */

import React, { useState, useEffect, useCallback } from 'react';
import componentStyles from "./PromotionComponent.module.css";

const videoSources = [
  `${process.env.PUBLIC_URL}/video/video_1.mp4`,
  `${process.env.PUBLIC_URL}/video/video_2.mp4`,
  `${process.env.PUBLIC_URL}/video/video_3.mp4`,
  `${process.env.PUBLIC_URL}/video/video_4.mp4`,
];

function PromotionContainer() {
  const [currentVideo, setCurrentVideo] = useState('');

  // selectRandomVideo 함수는 컴포넌트가 리렌더링될 때 재생성되지 않습니다.
  // 의존성 배열에서 videoSources를 제거했습니다.
  const selectRandomVideo = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * videoSources.length);
    setCurrentVideo(videoSources[randomIndex]);
  }, []); // 빈 배열을 사용해 함수가 마운트 시에만 생성되도록 합니다.

  useEffect(() => {
    selectRandomVideo();
  }, [selectRandomVideo]); // selectRandomVideo 함수가 변경되지 않기 때문에 여기서는 문제가 되지 않습니다.

  const handleVideoEnd = () => {
    selectRandomVideo();
  };


  return (
    <>
      <div className={componentStyles.promotionContainer}>
        <div className={componentStyles.mainText}>Wherever You Want</div>
      </div>
      {currentVideo && (
        <div className={componentStyles.videoContainer}>
          <video width="320" height="240" controls autoPlay muted onEnded={handleVideoEnd}>
            <source src={currentVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      )}
    </>
  );
}

export default PromotionContainer;
