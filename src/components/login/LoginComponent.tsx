import { Button, Stack, TextField, styled } from "@mui/material";
import React, { useState } from "react";
import styles from "./Login.module.css";
import OauthButton from "./OauthButton";
import useLogin from "../../hooks/login/useLogin";
import { LoginData } from "../../api/login/postLogin";
// import emailjs from "@emailjs/browser";

//밖으로 뺸 이유. state 변경 시 리렌더링 되는데 이때, styled도 같이 다시 선언되어 할때마다 리렌더링 되어서 포커스가 자동으로 풀림.
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
});

function LoginContainer({
  setOnRegister,
}: {
  setOnRegister: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { Login } = useLogin();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const inputData: LoginData = {
      email: email,
      password: password,
    };
    Login(inputData);
  };

  //이메일 인증 필요한 부분
  // const form = React.useRef(null);

  // const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();

  //   emailjs
  //     .sendForm(
  //       "PolaSMTP",
  //       "template_l7tds0g",
  //       e.currentTarget,
  //       "abjNlLEg_laho8S7t"
  //     )
  //     .then(
  //       (result) => {
  //         console.log(result.text);
  //       },
  //       (error) => {
  //         console.log(error.text);
  //       }
  //     );
  // };

  return (
    <div>
      {/* 입력 필드 */}
      <Stack className={styles.inputContainer} spacing={2}>
        <form method="post" onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <InputTextField
              className={styles.bottomButton}
              label="이메일 입력"
              required
              variant="outlined"
              color="success"
              value={email}
              onChange={(value: React.ChangeEvent<HTMLInputElement>) => {
                setEmail(value.target.value);
              }}
            />
            <InputTextField
              label="비밀번호 입력"
              type="password"
              color="success"
              required
              variant="outlined"
              value={password}
              onChange={(value: React.ChangeEvent<HTMLInputElement>) => {
                setPassword(value.target.value);
              }}
            />
            <Button
              type="submit"
              variant="contained"
              sx={{
                backgroundColor: "#13c4a3",
                fontSize: "1.5rem",
                ":hover": { backgroundColor: "#13c4a3", fontSize: "1.5rem" },
              }}
            >
              로그인
            </Button>
          </Stack>
        </form>

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
            계정이 없으신가요?
            <span style={{ color: "#13c4a3", marginLeft: "5PX" }}>
              가입하기
            </span>
          </Button>
        </div>
      </Stack>

      {/* 이메일 백엔드 없이 외부 서버 빌려서 인증하기 */}
      {/* <div>
        <form ref={form} onSubmit={sendEmail}>
          <label>Email</label>
          <input type="email" name="user_email" />
          <textarea name="message" hidden value={test} />
          <input type="submit" value="Send" />
        </form>
      </div>
      <div>
        <form onSubmit={veritest}>
          <input
            type=""
            onChange={(value: React.ChangeEvent<HTMLInputElement>) => {
              setTestCase(value.target.value);
            }}
          />
          <input type="submit" value="Send" />
        </form>
      </div> */}
    </div>
  );
}

export default LoginContainer;
