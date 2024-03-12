import { Button, IconButton, Stack, TextField, styled } from "@mui/material";
import React from "react";
import styles from "./login.module.css";
import GoogleIcon from "@mui/icons-material/Google";

function RegisterContainer({
  setOnRegister,
}: {
  setOnRegister: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const InputTextField = styled(TextField)({
    fontSize: "1.5rem",
    backgroundColor: "#F5F5F5",
    borderRadius: "2px",
    "& label": {
      color: "#13c4a3",
      fontSize: "1.3rem",
    },
    "& label.Mui-focused": {
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

        <div>
          <InputTextField
            label="이메일 입력"
            required
            variant="outlined"
            type="email"
            size="small"
            sx={{ width: "80%" }}
          />
          <Button
            variant="contained"
            sx={{
              width: "20%",
              backgroundColor: "#13c4a3",
              fontSize: "1.5rem",
              ":hover": { backgroundColor: "#13c4a3", fontSize: "1.5rem" },
            }}
          >
            인증
          </Button>
        </div>

        <InputTextField
          size="small"
          label="인증번호 입력"
          required
          variant="outlined"
        />
        <InputTextField
          size="small"
          label="비밀번호 입력"
          type="password"
          required
          variant="outlined"
        />
        <InputTextField
          size="small"
          label="비밀번호 재입력"
          type="password"
          required
          variant="outlined"
        />
        <InputTextField size="small" label="성명" required variant="outlined" />
        <InputTextField
          size="small"
          label="닉네임"
          required
          variant="outlined"
        />
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#13c4a3",
            fontSize: "1.5rem",
            ":hover": { backgroundColor: "#13c4a3", fontSize: "1.5rem" },
          }}
        >
          회원 가입
        </Button>

        <div className={styles.center}>
          <Button
            className={styles.bottomButton}
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
