import React from "react"; // React를 임포트합니다.
import inputStyles from "./UniversalInput.module.css";

interface UniversalInputProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type: string;
  id: string;
  isRequired?: boolean;
  errorMsg?: string;
}

const inputStyle = (isValid: boolean | null) => ({
  borderColor: isValid ? "#15C4A3" : "red",
  color: isValid ? "#15C4A3" : "red",
});

const UniversalInput = ({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  id,
  isRequired,
  errorMsg,
}: UniversalInputProps) => {
  return (
    <div>
      <div
        className={inputStyles.inputContainer}
        style={inputStyle(value !== "")}
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
      {isRequired && (
        <p className={inputStyles.errorMsg} style={inputStyle(value !== "")}>
          {errorMsg}
        </p>
      )}
    </div>
  );
};

export default UniversalInput;
