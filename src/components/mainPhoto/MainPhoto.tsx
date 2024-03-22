import styles from "./MainPhoto.module.css";

const MainPhoto = () => {
  return (
    <div className={styles.mainPhotoZone}>
      <img className={styles.mainPhoto} src="다리.jpg" alt="메인 이미지" />
      <div className={styles.mainPhotoText}>
        <span>여행을 떠나요</span>
        <br />
        <span>어디로 갈지</span>
        <br />
        <span>함께 골라봐요</span>
        <br />
      </div>
    </div>
  );
};

export default MainPhoto;
