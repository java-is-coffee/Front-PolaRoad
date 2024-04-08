import formStyles from "./EditMemberInfoForm.module.css";
import { IMemberInfoDetails } from "interface/member/IMemberInfoDetails";
import EditSingleInfo from "./editForm/EditSingleInfoForm";
import patchMemberInfo from "api/member/patchMemberInfo";
import { useState } from "react";
import { toast } from "react-toastify";
import { IoChevronBack } from "react-icons/io5";
import EditPasswordForm from "./editForm/EditPasswordInfoForm";

export type formType = "name" | "nickname" | "email" | "password";

interface EditMemberInfoProps {
  type: formType;
  memberInfo: IMemberInfoDetails;
  handleReturnDefault: () => void;
}

const EditMemberInfo = ({
  type,
  memberInfo,
  handleReturnDefault,
}: EditMemberInfoProps) => {
  const [editData, setEditData] = useState<string>();

  // 타입에 따라 memberInfo에서 가져올 데이터 결정
  const memberDataMapping = {
    name: memberInfo.name,
    nickname: memberInfo.nickname,
    email: memberInfo.email,
    password: "",
  };
  const memberData = memberDataMapping[type] || "";

  const handleEdit = async () => {
    try {
      await patchMemberInfo({ [type]: editData }); // 동적 속성 이름을 대괄호로 감싸서 수정
      toast.info("수정이 완료되었습니다.");
      handleReturnDefault();
    } catch (error) {
      toast.error("수정간에 오류가 발생했습니다.");
    }
  };
  const handleDataChange = (data: string) => {
    setEditData(data);
  };

  return (
    <div className={formStyles.formContainer}>
      <IoChevronBack
        size={"24px"}
        className={formStyles.backIcon}
        onClick={handleReturnDefault}
      />
      {type !== "password" ? (
        <EditSingleInfo
          dataType={type}
          memberData={memberData}
          handleChange={handleDataChange}
        />
      ) : (
        <EditPasswordForm dataType={type} />
      )}
      {type !== "password" && (
        <button type="button" onClick={handleEdit}>
          완료
        </button>
      )}
    </div>
  );
};

export default EditMemberInfo;
