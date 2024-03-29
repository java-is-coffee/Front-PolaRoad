import React, { useEffect, useState } from 'react';
import componentStyles from './HomeModal.module.css';

interface HomeModalProps {
  open: boolean;
  handleClose: () => void;
  children: React.ReactNode;
}

const HomeModal: React.FC<HomeModalProps> = ({ open, handleClose, children }) => {
  const [modalSize, setModalSize] = useState({ width: 'auto', height: 'auto' });

  if (!open) return null;

  const enhanceChild = (child: React.ReactElement) => {
    if (child.type === 'img') {
      return React.cloneElement(child, {
        onLoad: (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
          const image = e.currentTarget;
          // 모달의 최대 크기를 정의 (여기서는 CSS에서 정의한 80vw와 80vh를 사용합니다)
          const maxWidth = window.innerWidth * 0.8; // 80% of viewport width
          const maxHeight = window.innerHeight * 0.8; // 80% of viewport height
  
          const widthRatio = maxWidth / image.naturalWidth;
          const heightRatio = maxHeight / image.naturalHeight;
          const scale = Math.min(widthRatio, heightRatio, 1); // 이미지의 원본 크기보다 크게 확대하지 않음
  
          const adjustedWidth = image.naturalWidth * scale;
          const adjustedHeight = image.naturalHeight * scale;
  
          // 이미지 크기를 모달에 맞춰 조절
          setModalSize({
            width: `${adjustedWidth}px`,
            height: `${adjustedHeight}px`
          });
        }
      });
    }
    return child;
  };

  return (
    <div className={componentStyles.modalOverlay} onClick={handleClose}>
      <div
        className={componentStyles.modalContent}
        onClick={(e) => e.stopPropagation()}
        style={{ width: modalSize.width, height: modalSize.height }}
      >
        {React.Children.map(children, (child) => 
          React.isValidElement(child) ? enhanceChild(child) : child
        )}
      </div>
    </div>
  );
};

export default HomeModal;