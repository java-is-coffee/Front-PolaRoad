import { Button, Stack, TextField, styled } from "@mui/material";
import React from "react";
import styles from "./login.module.css";
import OauthButton from "./oauthButton";

function LoginContainer({
  setOnRegister,
}: {
  setOnRegister: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const InputTextField = styled(TextField)({
    fontSize: "1.5rem",
    backgroundColor: "#DBDBDB",
    borderRadius: "2px",
    "& label": {
      // placeholder text color
      color: "#13c4a3",
      fontSize: "1.3rem",
    },
    "& label.Mui-focused": {
      // 해당 input focus 되었을 때 placeholder text color
      color: "#13c4a3",
    },

    "& .MuiOutlinedInput-root": {
      fontSize: "1.5rem",
      "& fieldset": {
        borderColor: "#13c4a3",
      },
    },

    "& .MuiOutlinedInput-focused": {
      fontSize: "1.5rem",
      "& fieldset": {
        borderColor: "#13c4a3",
      },
    },
  });

  return (
    <div>
      {/* 입력 필드 */}
      <Stack className={styles.inputContainer} spacing={2}>
        <InputTextField
          className={styles.bottomButton}
          label="이메일 입력"
          required
          variant="outlined"
        />
        <InputTextField
          label="비밀번호 입력"
          // type="password"
          required
          variant="outlined"
          sx={{
            fontSize: "1.5rem",
            borderColor: "#13c4a3",
            ":focus": {
              backgroundColor: "red",
            },
          }}
        />
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#13c4a3",
            fontSize: "1.5rem",
            ":hover": { backgroundColor: "#13c4a3", fontSize: "1.5rem" },
          }}
        >
          로그인
        </Button>
        <div className={styles.customHr}>
          <span>또는</span>
        </div>
        <OauthButton />

        <div className={styles.center}>
          <Button
            className={styles.bottomButton}
            fullWidth
            sx={{ color: "#13c4a3" }}
          >
            비밀번호를 잊으셨나요?
          </Button>
        </div>

        <div className={styles.center}>
          <Button
            className={styles.bottomButton}
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
