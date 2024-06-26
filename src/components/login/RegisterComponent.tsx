import {
  Button,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  styled,
} from "@mui/material";
import React, { useState } from "react";
import styles from "./Login.module.css";
// import GoogleIcon from "@mui/icons-material/Google";
import { RegisterData } from "../../api/login/postRegister";
import useRegister from "../../hooks/login/useRegister";
import { toast } from "react-toastify";
import OauthButton from "./OauthButton";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { EmailDTO } from "api/login/emailCheck";
import postSendEmail from "api/login/postSendEmail";

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
  const [isEmail, setIsEmail] = useState(false);
  const [certificationNumber, setCertificationNumber] = useState("");
  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [dupPassword, setDupPassword] = useState("");
  const [dupCheck, setDupCheck] = useState(true);
  const [regPassword, setRegPassword] = useState(true);

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showDupPassword, setDupShowPassword] = useState<boolean>(false);

  const { register, checkPassword, dupCheckEmail } = useRegister();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const inputData: RegisterData = {
      email: email,
      password: password,
      certificationNumber: certificationNumber,
      name: name,
      nickname: nickname,
    };
    const result = await register(inputData);

    //기존 로그인(useLogin 에서 바로 네비게이션 쓰기)과 달리 state변경이기에 해당 화면에서 수정
    if (result === true) {
      setOnRegister(false);
    }
  };

  const checkingPassword = () => {
    if (!checkPassword(password)) {
      setRegPassword(false);
    }
    if (checkPassword(password)) {
      setRegPassword(true);
    }

    if (password === dupPassword) {
      setDupCheck(true);
    } else setDupCheck(false);
  };

  const checkingEmail = async () => {
    const dupCheck = await dupCheckEmail(email);
    if (dupCheck) {
      setIsEmail(true);
    } else {
      setIsEmail(false);
    }
  };

  const handleVisibility = (type: string) => {
    if (type === "first") setShowPassword((prev) => !prev);
    else setDupShowPassword((prev) => !prev);
  };

  const sendEmail = async () => {
    const targetEmail: EmailDTO = {
      data: {
        email: email,
      },
    };

    const result = await postSendEmail(targetEmail);

    if (result === true) toast.success("메일을 보냈습니다.");
    else toast.error("오류 발생.");
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
                onBlur={checkingEmail}
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
                disabled={isEmail ? false : true}
                onClick={sendEmail}
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
              onChange={(value: React.ChangeEvent<HTMLInputElement>) => {
                setCertificationNumber(value.target.value);
              }}
            />
            <InputTextField
              size="small"
              label="비밀번호 입력"
              type={showPassword ? "text" : "password"}
              required
              variant="outlined"
              onChange={(value: React.ChangeEvent<HTMLInputElement>) => {
                setPassword(value.target.value);
              }}
              color="success"
              onBlur={checkingPassword}
              error={regPassword ? false : true}
              helperText="8~15자리 대소문자+숫자+특수문자로 이뤄진 비밀번호를 입력해주세요."
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => handleVisibility("first")}>
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <InputTextField
              size="small"
              label="비밀번호 재입력"
              type={showDupPassword ? "text" : "password"}
              required
              variant="outlined"
              onChange={(value: React.ChangeEvent<HTMLInputElement>) => {
                setDupPassword(value.target.value);
              }}
              onBlur={checkingPassword}
              error={dupCheck ? false : true}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => handleVisibility("second")}>
                      {showDupPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
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
