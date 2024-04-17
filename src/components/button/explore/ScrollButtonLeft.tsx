import { IconButton } from "@mui/material";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";

interface ScrollButtonProps {
  handleBack: React.MouseEventHandler<HTMLButtonElement>;
}

const ScrollButtonLeft = ({ handleBack }: ScrollButtonProps) => {
  return (
    <>
      <IconButton
        size="large"
        sx={{
          padding: "10px",
          backgroundColor: "white",
          ":hover": { backgroundColor: "white" },
        }}
        onClick={handleBack}
      >
        <KeyboardArrowLeftIcon sx={{ fontSize: "2rem" }} />
      </IconButton>
    </>
  );
};

export default ScrollButtonLeft;
