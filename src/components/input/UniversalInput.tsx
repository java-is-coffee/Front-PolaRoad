import React from "react";
import inputStyles from "./UniversalInput.module.css";

interface UniversalInputProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type: string;
  id: string;
  errorMsg?: string;
  isValidate: boolean;
}

// 입력 필드 스타일을 결정하는 함수
const inputFieldStyle = (isValid: boolean) => ({
  borderColor: isValid ? "#15C4A3" : "red",
});

// 오류 메시지 스타일을 결정하는 상수 (필요한 경우 조절 가능)
const errorMessageStyle = (isValid: boolean) => ({
  color: isValid ? "#15C4A3" : "red",
});

const UniversalInput = ({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  id,
  errorMsg,
  isValidate,
}: UniversalInputProps) => {
  return (
    <div>
      <div
        className={inputStyles.inputContainer}
        style={inputFieldStyle(isValidate)}
      >
        <label htmlFor={id}>{label}</label>
        <input
          type={type}
          id={id}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      </div>
      <p className={inputStyles.errorMsg} style={errorMessageStyle(isValidate)}>
        {isValidate ? "가능한 이름입니다." : errorMsg}
      </p>
    </div>
  );
};

export default UniversalInput;
