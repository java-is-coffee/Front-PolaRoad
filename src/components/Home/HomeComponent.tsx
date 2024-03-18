/* 데이터 처리: 일반적으로 외부에서 데이터를 props로 받아와서 표시, 자체적으로 데이터를 가져오거나 관리하는 로직을 최소화
예시: 버튼, 입력 필드, 아이템 리스트의 각 아이템 등 */

import React, { useState, useEffect, useCallback } from 'react';
import componentStyles from "./HomeComponent.module.css";
import HomePosting from './HomePosting';
import HomeFooter from './HomeFooter';
// import HomeModal from './HomeModal'; 

function HomeComponent() {
  const videoSources = [
    `${process.env.PUBLIC_URL}/video/video_1.mp4`,
    `${process.env.PUBLIC_URL}/video/video_2.mp4`,
    `${process.env.PUBLIC_URL}/video/video_3.mp4`,
    `${process.env.PUBLIC_URL}/video/video_4.mp4`,
  ];

  const [currentVideo, setCurrentVideo] = useState('');

  const selectRandomVideo = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * videoSources.length);
    setCurrentVideo(videoSources[randomIndex]);
  }, [videoSources]);

  useEffect(() => {
    selectRandomVideo();
  }, [selectRandomVideo]);

  const handleVideoEnd = () => {
    selectRandomVideo();
  };

  return (
    <>
      <div className={componentStyles.homeComponent}>
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
      
      <HomePosting />
      <HomeFooter />
    </>
  );
}

export default HomeComponent;
