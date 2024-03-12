interface profileImgProps {
  size: string;
}
function ProfileImg({ size }: profileImgProps) {
  return (
    <div
      style={{
        width: size,
        borderRadius: "50%",
        overflow: "hidden",
      }}
    >
      <img
        src="/basic/profile.png"
        alt="프로필 기본이미지"
        width={size}
        height={size}
        style={{ display: "block", width: "100%", height: "auto" }}
      />
    </div>
  );
}

export default ProfileImg;
