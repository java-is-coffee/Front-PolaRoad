import React, { useEffect, useRef, useState } from 'react';
import componentStyles from "./HomePosting.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { BsGeoAltFill } from "react-icons/bs";
import HomeModal from './HomeModal'; 
import { Transition } from "react-transition-group";

const images = [
  { src: "/photo/강변.jpg", username: "User1", location: "Seoul", likes: 10, title: "Beautiful River" },
  { src: "/photo/다리.jpg", username: "User2", location: "Busan", likes: 15, title: "Amazing Bridge" },
  { src: "/photo/도로.jpg", username: "User3", location: "Incheon", likes: 20, title: "Scenic Road" },
  { src: "/photo/동굴.jpg", username: "User4", location: "Jeju", likes: 25, title: "Mystic Cave" },
  { src: "/photo/바닷가.jpg", username: "User5", location: "Gangneung", likes: 30, title: "Sunny Beach" },
  { src: "/photo/보트.jpg", username: "User6", location: "Ulsan", likes: 35, title: "Boat Adventure" },
  { src: "/photo/산.jpg", username: "User7", location: "Gyeongju", likes: 40, title: "Mountain Hike" },
  { src: "/photo/일몰.jpg", username: "User8", location: "Jeonju", likes: 45, title: "Beautiful Sunset" },
];

interface Image {
  src: string;
  username: string;
  location: string;
  likes: number;
  title: string;
}

function HomePostingContainer() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollStartX, setScrollStartX] = useState(0);
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);


  useEffect(() => {
    const scrollStep = -0.5; // 음수 값으로 스크롤 속도를 조절하여 왼쪽으로 이동
    let animationFrameId: number; 
  
    const animateScroll = () => {
      if (scrollRef.current) {
        let newScrollPosition = scrollRef.current.scrollLeft + scrollStep;
        scrollRef.current.scrollLeft = newScrollPosition;
  
        // 스크롤이 시작 위치에 도달하면 끝으로 이동
        if (newScrollPosition <= 0) {
          scrollRef.current.scrollLeft = scrollRef.current.scrollWidth - scrollRef.current.clientWidth;
        }
      }
      animationFrameId = requestAnimationFrame(animateScroll);
    };
  
    animateScroll();
  
    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
    setStartX(e.pageX);
    if (scrollRef.current) {
      setScrollStartX(scrollRef.current.scrollLeft);
    }
  };

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const currentX = e.pageX;
    const deltaX = currentX - startX;
    scrollRef.current.scrollLeft = scrollStartX - deltaX;
  };

  const onMouseUp = () => {
    setIsDragging(false);
  };

  const onMouseLeave = () => {
    setIsDragging(false);
  };

  const onImageClick = (image: React.SetStateAction<Image | null>) => {
    setSelectedImage(image);
    setIsModalOpen(true); 
  };

  const closeModal = () => {
    setIsModalOpen(false); 
  };

  

  return (
    <>
      <div className={componentStyles.homeContainer}>
        <div className={componentStyles.mainText}>
          JOIN OUR COMMUNITY <br/>
        </div>
        <div className={componentStyles.subText}>
          Be notified with new trips
        </div>
        
        <div 
          ref={scrollRef} 
          className={componentStyles.galleryContainer} 
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove} 
          onMouseUp={onMouseUp} 
          onMouseLeave={onMouseLeave}
        >
          {images.map((item, index) => (
            <div key={index} className={componentStyles.galleryImageWrapper} onClick={() => onImageClick(item)}>
              <img src={item.src} alt={item.title} className={componentStyles.galleryImage} />
              <div className={componentStyles.imageInfo}>
                <div className={componentStyles.userInfo}>{item.username}</div>
                <div className={componentStyles.title}>{item.title}</div>
                <div className={componentStyles.likes}><FontAwesomeIcon icon={faHeart} />{item.likes}</div>
                <div className={componentStyles.location}><BsGeoAltFill />{item.location}</div>

                
              </div>

            </div>
          ))}
          <div className={componentStyles.galleryImageWrapper}>
            <img src={images[0].src} alt={`Gallery End`} className={componentStyles.galleryImage} />
          </div>
        </div>
      </div>

      {isModalOpen && selectedImage && (
        <HomeModal open={isModalOpen} handleClose={closeModal}>
          <div className={componentStyles.modalInnerContent}>
            <img src={selectedImage.src} alt={selectedImage.title} className={componentStyles.modalImage} />
            <div className={componentStyles.modalTextContent}>
              <h3>{selectedImage.username} </h3>
              <p> {selectedImage.title} </p>
              <div><FontAwesomeIcon icon={faHeart} /> {selectedImage.likes}</div>
              <div><BsGeoAltFill /> {selectedImage.location}</div>
            </div>
          </div>
        </HomeModal>
      )}

    </>
  );
}

export default HomePostingContainer;

