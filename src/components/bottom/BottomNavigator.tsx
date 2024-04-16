import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import styles from "./BottomNavigator.module.css";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PersonIcon from "@mui/icons-material/Person";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import HomeIcon from "@mui/icons-material/Home";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { useModal } from "hooks/modal/ModalProvider";
import ModalOption from "enum/modalOptionTypes";
import useStoreValue from "hooks/storeValue/useStoreValue";

const commonStyles = {
  "&.Mui-selected": { color: "#12b193" },
  ".MuiBottomNavigationAction-label": { fontSize: "1.5rem" },
  "&.Mui-selected .MuiBottomNavigationAction-label": {
    fontSize: "1.5rem",
  },
};

const BottomNavigator = () => {
  const navigate = useNavigate();
  const { isMobileSearchFilter } = useStoreValue();

  const { openModal } = useModal();
  const setModal = () => {
    openModal(ModalOption.POST);
  };

  const [value, setValue] = useState(null);
  return (
    <div>
      {isMobileSearchFilter ? (
        ""
      ) : (
        <div className={styles.midContainer}>
          <Button
            variant="contained"
            disableElevation
            onClick={setModal}
            sx={{
              borderRadius: "20px",
              fontSize: "1.5rem",
              backgroundColor: "#13c4a3",
              ":hover": {
                backgroundColor: "#13c4a3",
              },
            }}
          >
            New Post
          </Button>
        </div>
      )}

      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          event.preventDefault();
          setValue(newValue);
          navigate(`/${newValue}`);
        }}
      >
        <BottomNavigationAction
          label="Home"
          sx={commonStyles}
          value={"explore"}
          icon={<HomeIcon sx={{ fontSize: "2.5rem" }} />}
        />
        <BottomNavigationAction
          label="Subscribe"
          sx={commonStyles}
          value={"Subscribe"}
          icon={
            <FavoriteIcon
              sx={{
                fontSize: "2.5rem",
              }}
            />
          }
        />
        <BottomNavigationAction
          label="Map"
          sx={commonStyles}
          value={"Map"}
          icon={
            <LocationOnIcon
              sx={{
                fontSize: "2.5rem",
              }}
            />
          }
        />
        <BottomNavigationAction
          label="Profile"
          value={"my"}
          sx={commonStyles}
          icon={
            <PersonIcon
              sx={{
                fontSize: "2.5rem",
              }}
            />
          }
        />
      </BottomNavigation>
    </div>
  );
};

export default BottomNavigator;
