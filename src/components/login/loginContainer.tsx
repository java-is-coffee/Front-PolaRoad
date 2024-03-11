import { Button, IconButton, Stack, TextField } from "@mui/material";
import React from "react";
import styles from "./login.module.css";
import GoogleIcon from "@mui/icons-material/Google";

function LoginContainer() {
  return (
    <div className={styles.container}>
      {/* 중앙 글씨 */}
      <div className={styles.mainText}>TRIPPER</div>

      {/* 나만의 여행일기를 작성해보세요! */}
      <div className={styles.subText}>
        나만의 여행일기를 <br /> 작성해보세요!
      </div>

      {/* 입력 필드 */}
      <Stack className={styles.inputContainer} spacing={2}>
        <TextField
          label="이메일 입력"
          required
          variant="outlined"
          size="small"
        />
        <TextField
          size="small"
          label="비밀번호 입력"
          type="password"
          required
          variant="outlined"
        />
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#13c4a3",
            ":hover": { backgroundColor: "#13c4a3" },
          }}
        >
          로그인
        </Button>
        <div className={styles.customHr}>
          <span>또는</span>
        </div>

        <div className={styles.oauthButton}>
          <span style={{ marginRight: "50px" }}>
            <IconButton size="large" sx={{ backgroundColor: "#d9d9d9" }}>
              <GoogleIcon />
            </IconButton>
            <div>Google</div>
          </span>
          <span>
            <IconButton
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

        <div className={styles.center}>
          <Button fullWidth sx={{ color: "#13c4a3" }}>
            비밀번호를 잊으셨나요?
          </Button>
        </div>

        <div className={styles.center}>
          <Button variant="outlined" fullWidth>
            계정이 있으신가요?
            <span style={{ color: "#13c4a3", marginLeft: "5PX" }}>
              가입하기
            </span>
          </Button>
        </div>
      </Stack>

      {/* 또는 & Oauth 로그인 버튼 */}
      <div></div>
    </div>
  );
}

export default LoginContainer;
