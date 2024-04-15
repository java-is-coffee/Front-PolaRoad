import { Button } from "@mui/material";
import styles from "./Login.module.css";
// import GoogleIcon from "@mui/icons-material/Google";

const OauthButton = () => {
  const handleOauthKakao = async () => {
    window.location.href =
      "https://k218cb89f724ba.user-app.krampoline.com/api/oauth2/login/kakao";
  };

  const handleOauthGoogle = async () => {
    window.location.href =
      "https://k218cb89f724ba.user-app.krampoline.com/api/oauth2/login/google";
  };
  return (
    <div className={styles.oauthButton}>
      <div>
        <Button
          fullWidth
          variant="contained"
          sx={{
            background: "#FEE500",
            borderRadius: "12px",
            fontSize: "1.5rem",
            color: "#000000",
            ":hover": { background: "#FEE500" },
          }}
          onClick={handleOauthKakao}
        >
          <img
            className={styles.kakaoLogo}
            src="kakao_logo.png"
            alt="kakao_logo"
          />
          카카오 로그인
        </Button>
      </div>
      <div>
        <Button
          fullWidth
          variant="contained"
          sx={{
            background: "white",
            borderRadius: "12px",
            fontSize: "1.5rem",
            color: "black",
            ":hover": { background: "white" },
          }}
          onClick={handleOauthGoogle}
        >
          <img
            className={styles.kakaoLogo}
            src="google_logo.png"
            alt="google_logo"
          />
          구글 로그인
        </Button>
      </div>
    </div>
  );
};

export default OauthButton;
