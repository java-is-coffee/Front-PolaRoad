import { useState } from "react";
import formStyles from "./MemberInfoForm.module.css";
import { formType } from "../EditMemberInfoForm";
import useRegister from "hooks/login/useRegister";
import patchResetPassword from "api/member/patchResetPassword";
import secureLocalStorage from "react-secure-storage";
import { toast } from "react-toastify";

interface EditPasswordFProps {
  dataType: formType;
}

const inputStyle = (isValid: boolean | null) => ({
  borderColor: isValid ? "#6F84FF" : "red",
});

const EditPasswordF = ({ dataType }: EditPasswordFProps) => {
  const [newPassword, setNewPassword] = useState<string>("");
  const [isValidateNewPW, setIsValidateNewPW] = useState<boolean | null>(null);
  const [isValidateRepeatNewPW, setIsValidateRepeatNewPW] = useState<
    boolean | null
  >(null);

  const { checkPassword } = useRegister();

  // 입력 필드가 변경될 때 호출되는 함수
  const handleChangeFirstPW = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(e.target.value);
    checkPassword(e.target.value)
      ? setIsValidateNewPW(true)
      : setIsValidateNewPW(false);
  };

  const handleChangeSecondPW = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (checkPassword(e.target.value) && e.target.value === newPassword) {
      setIsValidateRepeatNewPW(true);
    } else {
      setIsValidateRepeatNewPW(false);
    }
  };

  const handleResetPW = async () => {
    if (isValidateNewPW && isValidateRepeatNewPW) {
      const result = await patchResetPassword({ password: newPassword });
      if (result) {
        secureLocalStorage.clear();
        toast.info("수정되었습니다. 재로그인해주세요.");
        setTimeout(() => {
          window.location.href = "/login";
        }, 2000);
      } else toast.error("수정에 실패했습니다. 다시 시도해주세요");
    }
  };

  return (
    <div className={formStyles.formContainer}>
      <h2>{dataType.toUpperCase()}</h2>
      <div
        className={formStyles.inputContainer}
        style={inputStyle(isValidateNewPW)}
      >
        <div className={formStyles.nameSpace}>
          <label htmlFor="password">{dataType}</label>
          <input
            type="password"
            id="password"
            placeholder="새로운 password를 입력해주세요"
            onChange={handleChangeFirstPW}
          />
        </div>
      </div>
      {isValidateNewPW ? (
        <p style={{ color: "#6F84FF" }}>사용가능한 비밀번호입니다.</p>
      ) : (
        <p style={{ color: "red" }}>
          비밀번호는 영어 숫자 특수문자가 모두 포함되어야 합니다.
        </p>
      )}
      <div
        className={formStyles.inputContainer}
        style={inputStyle(isValidateRepeatNewPW)}
      >
        <div className={formStyles.nameSpace}>
          <label htmlFor="repeat-password">{"repeat new password"}</label>
          <input
            type="password"
            id="repeat-password"
            placeholder="다시 한번 패스워드 입력해주세요"
            onChange={handleChangeSecondPW}
          />
        </div>
      </div>
      {isValidateRepeatNewPW ? (
        <p style={{ color: "#6F84FF" }}>일치합니다.</p>
      ) : (
        <p style={{ color: "red" }}>비밀번호가 일치하지 않습니다.</p>
      )}
      <button type="button" onClick={handleResetPW}>
        완료
      </button>
    </div>
  );
};

export default EditPasswordF;
