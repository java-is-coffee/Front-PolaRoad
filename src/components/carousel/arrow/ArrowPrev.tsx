import { IoIosArrowBack } from "react-icons/io";

export function ArrowPrev(props: any) {
  const { onClick } = props;
  return (
    <button
      className="left"
      onClick={onClick}
      style={{
        backgroundColor: "#ccc",
        borderRadius: "50%",
        width: "40px",
        height: "40px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        left: "10px",
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: "10",
      }}
    >
      <IoIosArrowBack size={"24px"} />
    </button>
  );
}
