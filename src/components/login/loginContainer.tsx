import { Button, Stack, TextField } from "@mui/material";
import React from "react";
import styles from "./login.module.css";
import OauthButton from "./oauthButton";

function LoginContainer({
  setOnRegister,
}: {
  setOnRegister: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <div>
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
        <OauthButton />

        <div className={styles.center}>
          <Button fullWidth sx={{ color: "#13c4a3" }}>
            비밀번호를 잊으셨나요?
          </Button>
        </div>

        <div className={styles.center}>
          <Button
            variant="outlined"
            fullWidth
            onClick={() => setOnRegister(true)}
          >
            계정이 있으신가요?
            <span style={{ color: "#13c4a3", marginLeft: "5PX" }}>
              가입하기
            </span>
          </Button>
        </div>
      </Stack>
    </div>
  );
}

export default LoginContainer;
