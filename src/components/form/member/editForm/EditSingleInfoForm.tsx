import { useState } from "react";
import formStyles from "./MemberInfoForm.module.css";
import { IoMdClose } from "react-icons/io";
import { formType } from "../EditMemberInfoForm";
import useRegister from "hooks/login/useRegister";

interface EditSingleInfoProps {
  dataType: formType;
  memberData: string;
  handleChange: (data: string) => void;
}

const inputStyle = (isValid: boolean | null) => ({
  borderColor: isValid ? "#6F84FF" : "red",
});

const EditSingleInfo = ({
  dataType,
  memberData,
  handleChange,
}: EditSingleInfoProps) => {
  const [editData, setEditData] = useState<string>(memberData);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [validateEmail, setValidateEmail] = useState<boolean | null>(null);
  const { checkEmail } = useRegister();

  // 입력 필드가 변경될 때 호출되는 함수
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setEditData(value);

    // 이메일 타입인 경우에만 유효성 검사
    if (dataType === "email") {
      setValidateEmail(checkEmail(value));
    }

    handleChange(value);
  };

  // '×' 버튼을 클릭했을 때 호출되는 함수
  const handleClearName = () => {
    setEditData("");
    handleChange("");
    if (dataType === "email") {
      setValidateEmail(null); // 이메일 입력을 클리어할 때 유효성 상태도 리셋
    }
  };

  return (
    <div className={formStyles.formContainer}>
      <h2>{dataType.toUpperCase()}</h2>
      <div
        className={formStyles.inputContainer}
        style={dataType === "email" ? inputStyle(validateEmail) : {}}
      >
        <div className={formStyles.nameSpace}>
          <label htmlFor="memberData">{dataType}</label>
          <input
            type={dataType === "email" ? "email" : "text"}
            id="memberData"
            value={editData}
            onChange={handleInputChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
        </div>
        {isFocused && (
          <IoMdClose
            className={formStyles.clearButton}
            onClick={handleClearName}
            size={"24px"}
          />
        )}
      </div>
      <p>{`변경하고자 하는 ${dataType}을 입력하세요`}</p>
    </div>
  );
};

export default EditSingleInfo;
