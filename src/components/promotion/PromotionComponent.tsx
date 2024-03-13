/* 데이터 처리: 일반적으로 외부에서 데이터를 props로 받아와서 표시, 자체적으로 데이터를 가져오거나 관리하는 로직을 최소화
예시: 버튼, 입력 필드, 아이템 리스트의 각 아이템 등 */

import React, { useState, useEffect } from 'react';
import componentStyles from "./PromotionComponent.module.css";

// 비디오 소스의 타입을 string[]으로 지정
function PromotionContainer() {
  const videoSources: string[] = [
    `${process.env.PUBLIC_URL}/video/video_1.mp4`,
    `${process.env.PUBLIC_URL}/video/video_2.mp4`,
    `${process.env.PUBLIC_URL}/video/video_3.mp4`,
    `${process.env.PUBLIC_URL}/video/video_4.mp4`,
  ];

  // 상태 타입을 string으로 명시적으로 지정
  const [currentVideo, setCurrentVideo] = useState<string>('');

  // 비디오를 랜덤하게 선택 함수
  const selectRandomVideo = () => {
    const randomIndex = Math.floor(Math.random() * videoSources.length);
    setCurrentVideo(videoSources[randomIndex]);
  };

  // 컴포넌트가 마운트될 때 첫 번째 비디오 선택
  useEffect(() => {
    selectRandomVideo();
  }, []);

  // 비디오가 끝났을 때
  const handleVideoEnd = () => {
    selectRandomVideo(); // 비디오가 끝나면 새로운 비디오를 랜덤 선택
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
