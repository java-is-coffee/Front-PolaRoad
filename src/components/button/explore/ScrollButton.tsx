import { IconButton } from "@mui/material";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

interface ScrollButtonProps {
  handleBack: React.MouseEventHandler<HTMLButtonElement>;
  handleNext: React.MouseEventHandler<HTMLButtonElement>;
}

const ScrollButton = ({ handleBack, handleNext }: ScrollButtonProps) => {
  return (
    <>
      <IconButton
        size="large"
        sx={{
          backgroundColor: "white",
          ":hover": { backgroundColor: "white" },
        }}
        onClick={handleBack}
      >
        <KeyboardArrowLeftIcon sx={{ fontSize: "2rem" }} />
      </IconButton>
      <IconButton
        size="large"
        sx={{
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

export default ScrollButton;
