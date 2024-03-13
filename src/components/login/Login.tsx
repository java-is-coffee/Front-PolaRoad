import React, { useState } from "react";
import styles from "./Login.module.css";
import LoginContainer from "./LoginContainer";
import RegisterContainer from "./Register";

function Login() {
  const [onRegister, setOnRegister] = useState(false);

  return (
    <div className={styles.loginContainer}>
      {/* 중앙 글씨 */}
      <div className={styles.mainText}>TRIPPER</div>

      {/* 나만의 여행일기를 작성해보세요! */}
      <div className={styles.subText}>
        나만의 여행일기를 <br /> 작성해보세요!
      </div>
      {onRegister ? (
        <RegisterContainer setOnRegister={setOnRegister} />
      ) : (
        <LoginContainer setOnRegister={setOnRegister} />
      )}
    </div>
  );
}

export default Login;