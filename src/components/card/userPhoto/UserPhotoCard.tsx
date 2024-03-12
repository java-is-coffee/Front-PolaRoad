import cardStyles from "./UserPhotoCard.module.css";

interface userPhotoCardProps {
  imgSrc: string;
}

function UserPhotoCard({ imgSrc }: userPhotoCardProps) {
  return (
    <div className={cardStyles.img}>
      <img className={cardStyles.img} src={imgSrc} alt="userImg" />
    </div>
  );
}

export default UserPhotoCard;
