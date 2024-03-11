import { Button, TextField } from "@mui/material";
import React from "react";

function LoginContainer() {
  return (
    <div>
      {/* 중앙 글씨 */}
      <div>TRIPPER</div>

      {/* 나만의 여행일기를 작성해보세요! */}
      <div>나만의 여행일기를 작성해보세요!</div>

      {/* 입력 필드 */}
      <div>
        <TextField id="outlined-basic" label="Outlined" variant="outlined" />
        <TextField id="outlined-basic" label="Outlined" variant="outlined" />
        <Button variant="contained">Contained</Button>
      </div>

      {/* 또는 & Oauth 로그인 버튼 */}
      <div>
        <div>
          <span>-----</span> <span>또는</span> <span>----</span>
        </div>

        <div>
          <Button variant="contained">구글 로그인</Button>
          <Button variant="contained">카카오 로그인</Button>
        </div>

        <div>
          <Button>비밀번호를 잊으셨나요?</Button>
        </div>

        <div>
          <Button variant="outlined">
            계정이 있으신가요?{" "}
            <span style={{ color: "red", marginLeft: "5PX" }}>가입하기</span>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default LoginContainer;
