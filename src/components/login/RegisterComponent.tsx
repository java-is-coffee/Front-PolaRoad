import { Button, IconButton, Stack, TextField, styled } from "@mui/material";
import React, { useState } from "react";
import styles from "./Login.module.css";
import GoogleIcon from "@mui/icons-material/Google";
import { RegisterData } from "../../api/login/postRegister";
import useRegister from "../../hooks/login/useRegister";
import { toast } from "react-toastify";
import OauthButton from "./OauthButton";

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

function RegisterContainer({
  setOnRegister,
}: {
  setOnRegister: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [email, setEmail] = useState("");
  const [isEmail, setIsEmail] = useState(true);
  // const [certificationNumber, setCertificationNumber] = useState("");
  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [dupPassword, setDupPassword] = useState("");
  const [dupCheck, setDupCheck] = useState(true);
  const [regPassword, setRegPassword] = useState(true);

  const useRegisterHooks = useRegister();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const inputData: RegisterData = {
      email: email,
      password: password,
      // certificationNumber: "",
      name: name,
      nickname: nickname,
    };
    console.log(inputData);
    // useLoginHooks.Login(inputData);
  };

  const checkPassword = () => {
    if (!useRegisterHooks.checkPassword(password)) {
      setRegPassword(false);
    }
    if (useRegisterHooks.checkPassword(password)) {
      setRegPassword(true);
    }

    if (password === dupPassword) {
      setDupCheck(true);
    } else setDupCheck(false);
  };

  const checkEmail = () => {
    const test = useRegisterHooks.checkEmail(email);
    console.log(test);

    if (test) {
      setIsEmail(true);
    }

    if (!test) {
      setIsEmail(false);
      console.log("xx");
      toast.error("x");
    }
  };

  return (
    <div>
      {/* 입력 필드 */}
      <Stack className={styles.inputContainer} spacing={2}>
        <OauthButton />
        <div className={styles.customHr}>
          <span>또는</span>
        </div>

        <form method="post" onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <div>
              <InputTextField
                label="이메일 입력"
                required
                variant="outlined"
                type="email"
                size="small"
                sx={{ width: "80%" }}
                onChange={(value: React.ChangeEvent<HTMLInputElement>) => {
                  setEmail(value.target.value);
                }}
                color="success"
                error={isEmail ? false : true}
              />
              <Button
                variant="contained"
                sx={{
                  width: "20%",
                  backgroundColor: "#13c4a3",
                  fontSize: "1.5rem",
                  ":hover": { backgroundColor: "#13c4a3", fontSize: "1.5rem" },
                }}
                onClick={checkEmail}
              >
                인증
              </Button>
            </div>

            <InputTextField
              size="small"
              label="인증번호 입력"
              required
              variant="outlined"
              color="success"
              // onChange={(value: React.ChangeEvent<HTMLInputElement>) => {
              //   setCertificationNumber(value.target.value);
              // }}
            />
            <InputTextField
              size="small"
              label="비밀번호 입력"
              type="password"
              required
              variant="outlined"
              onChange={(value: React.ChangeEvent<HTMLInputElement>) => {
                setPassword(value.target.value);
              }}
              color="success"
              onBlur={checkPassword}
              error={regPassword ? false : true}
              helperText="8~15자리 대소문자+숫자+특수문자로 이뤄진 비밀번호를 입력해주세요."
              // sx={{  fontSize: "1.5rem" }}
            />
            <InputTextField
              size="small"
              label="비밀번호 재입력"
              type="password"
              required
              variant="outlined"
              onChange={(value: React.ChangeEvent<HTMLInputElement>) => {
                setDupPassword(value.target.value);
              }}
              onBlur={checkPassword}
              error={dupCheck ? false : true}
            />
            <InputTextField
              size="small"
              label="성명"
              required
              variant="outlined"
              onChange={(value: React.ChangeEvent<HTMLInputElement>) => {
                setName(value.target.value);
              }}
              color="success"
            />
            <InputTextField
              size="small"
              label="닉네임"
              required
              variant="outlined"
              color="success"
              onChange={(value: React.ChangeEvent<HTMLInputElement>) => {
                setNickname(value.target.value);
              }}
            />
            <Button
              variant="contained"
              type="submit"
              sx={{
                backgroundColor: "#13c4a3",
                fontSize: "1.5rem",
                ":hover": { backgroundColor: "#13c4a3", fontSize: "1.5rem" },
              }}
              disabled={regPassword && isEmail && dupCheck ? false : true}
            >
              회원 가입
            </Button>
          </Stack>
        </form>

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
