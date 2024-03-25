import { IconButton } from "@mui/material";
import styles from "./Login.module.css";
import GoogleIcon from "@mui/icons-material/Google";

const OauthButton = () => {
  const handleOauth = async () => {
    window.location.href =
      "https://k951a463f2f5fa.user-app.krampoline.com/api/oauth2/login/kakao";
  };
  return (
    <div className={styles.oauthButton}>
      <span style={{ marginRight: "50px" }}>
        <IconButton size="large" sx={{ backgroundColor: "#d9d9d9" }}>
          <GoogleIcon />
        </IconButton>
        <div>Google</div>
      </span>
      <span>
        <IconButton
          onClick={handleOauth}
          size="large"
          sx={{
            backgroundColor: "yellow",
            ":hover": { backgroundColor: "yellow" },
          }}
        >
          <img className={styles.imgs} src="icons/kakao.png" alt="xx" />
        </IconButton>
        <div>Kakao</div>
      </span>
    </div>
  );
};

export default OauthButton;
