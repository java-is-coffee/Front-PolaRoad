import { IoIosArrowForward } from "react-icons/io";
export function ArrowNext(props: any) {
  const { onClick } = props;
  return (
    <button
      className={`right`}
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
        right: "10px",
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: "10",
      }}
    >
      <IoIosArrowForward size={"24px"} />
    </button>
  );
}
