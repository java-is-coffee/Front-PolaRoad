interface profileImgProps {
  size: string;
  imgUrl: string;
  onClick: () => void;
}
function ProfileImg({ size, imgUrl, onClick }: profileImgProps) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        overflow: "hidden",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
      }}
      onClick={onClick}
    >
      <img
        src={imgUrl ? imgUrl : "/basic/profile.png"}
        alt={imgUrl ? "프로필 이미지" : "프로필 기본이미지"}
        style={{
          display: "block",
          width: "100%",
          objectFit: "cover",
        }}
      />
    </div>
  );
}

export default ProfileImg;
