import React from 'react';
import componentStyles from "./HomeModal.module.css";

interface HomeModalProps {
  open: boolean;
  handleClose: () => void;
  children: React.ReactNode;
}

const HomeModal: React.FC<HomeModalProps> = ({ open, handleClose, children }) => {
  if (!open) return null;

  return (
    <div className={componentStyles.modalOverlay} onClick={handleClose}>
      <div className={componentStyles.modalContent} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

export default HomeModal;