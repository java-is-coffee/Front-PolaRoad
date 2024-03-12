import React, { useState } from "react";
import styles from "../../components/login/Login.module.css";
import LoginComponent from "../../components/login/LoginComponent";
import RegisterComponent from "../../components/login/RegisterComponent";

function LoginContainer() {
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
        <RegisterComponent setOnRegister={setOnRegister} />
      ) : (
        <LoginComponent setOnRegister={setOnRegister} />
      )}
    </div>
  );
}

export default LoginContainer;
