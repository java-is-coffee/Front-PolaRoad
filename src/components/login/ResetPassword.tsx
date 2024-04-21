import { Button, Stack, TextField, styled } from "@mui/material";
import React, { useState } from "react";
import styles from "./Login.module.css";
import postResetPassword, {
  ResetPasswordDTO,
} from "api/login/postRestPassword";
import { toast } from "react-toastify";

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

function ResetPasswordContainer({
  setOnResetPassword,
}: {
  setOnResetPassword: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  //한번만 전송되어야 하기 때문에.
  const [isSend, setIsSend] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const inputData: ResetPasswordDTO = {
      data: {
        email: email,
        name: name,
      },
    };
    setIsSend(true);

    const result = await postResetPassword(inputData);
    if (result === 200) {
      toast.success("임시 비밀번호를 이메일로 발송했습니다. 확인해주세요.");
      setOnResetPassword(false);
    } else {
      toast.error("입력해주신 정보들을 확인해주세요.");
      setIsSend(false);
    }
  };

  return (
    <div>
      <Stack className={styles.inputContainer} spacing={2}>
        <form method="post" onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <div>
              <InputTextField
                label="이메일 입력"
                required
                variant="outlined"
                type="email"
                size="small"
                onChange={(value: React.ChangeEvent<HTMLInputElement>) => {
                  setEmail(value.target.value);
                }}
                fullWidth
                color="success"
                autoComplete="off"
              />
            </div>
            <InputTextField
              size="small"
              label="성명"
              required
              variant="outlined"
              autoComplete="off"
              onChange={(value: React.ChangeEvent<HTMLInputElement>) => {
                setName(value.target.value);
              }}
              color="success"
            />

            <Button
              variant="contained"
              type="submit"
              sx={{
                backgroundColor: "#13c4a3",
                fontSize: "1.5rem",
                ":hover": { backgroundColor: "#13c4a3", fontSize: "1.5rem" },
              }}
              disabled={isSend ? true : false}
            >
              비밀번호 변경
            </Button>
            <div className={styles.center}>
              <Button
                className={styles.bottomButton}
                variant="outlined"
                fullWidth
                onClick={() => setOnResetPassword(false)}
              >
                <span style={{ color: "#13c4a3", marginLeft: "5PX" }}>
                  로그인화면으로 돌아가기
                </span>
              </Button>
            </div>
          </Stack>
        </form>
      </Stack>
    </div>
  );
}

export default ResetPasswordContainer;
