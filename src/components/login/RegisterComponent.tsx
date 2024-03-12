import { Button, IconButton, Stack, TextField } from "@mui/material";
import React from "react";
import styles from "./login.module.css";
import GoogleIcon from "@mui/icons-material/Google";

function RegisterContainer({
  setOnRegister,
}: {
  setOnRegister: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <div>
      {/* 입력 필드 */}
      <Stack className={styles.inputContainer} spacing={2}>
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
        <div className={styles.customHr}>
          <span>또는</span>
        </div>

        <TextField
          label="이메일 입력"
          required
          variant="outlined"
          type="email"
          size="small"
        />
        <TextField
          size="small"
          label="인증번호 입력"
          required
          variant="outlined"
        />
        <TextField
          size="small"
          label="비밀번호 입력"
          type="password"
          required
          variant="outlined"
        />
        <TextField
          size="small"
          label="비밀번호 재입력"
          type="password"
          required
          variant="outlined"
        />
        <TextField size="small" label="성명" required variant="outlined" />
        <TextField size="small" label="닉네임" required variant="outlined" />
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#13c4a3",
            ":hover": { backgroundColor: "#13c4a3" },
          }}
        >
          회원 가입
        </Button>

        <div className={styles.center}>
          <Button
            variant="outlined"
            fullWidth
            onClick={() => setOnRegister(false)}
          >
            계정이 있으신가요?
            <span style={{ color: "#13c4a3", marginLeft: "5PX" }}>로그인</span>
          </Button>
        </div>
      </Stack>
    </div>
  );
}

export default RegisterContainer;
