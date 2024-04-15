import { IconButton } from "@mui/material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

interface ScrollButtonProps {
  handleNext: React.MouseEventHandler<HTMLButtonElement>;
}

const ScrollButtonRight = ({ handleNext }: ScrollButtonProps) => {
  return (
    <>
      <IconButton
        size="large"
        sx={{
          padding: "10px",
          backgroundColor: "white",
          ":hover": { backgroundColor: "white" },
        }}
        onClick={handleNext}
      >
        <KeyboardArrowRightIcon sx={{ fontSize: "2rem" }} />
      </IconButton>
    </>
  );
};

export default ScrollButtonRight;
