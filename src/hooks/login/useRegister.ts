import { toast } from "react-toastify";
import postRegister, {
  RegisterDTO,
  RegisterData,
} from "../../api/login/postRegister";
import EmailCheck, { EmailData, EmailDTO } from "api/login/emailCheck";
const useRegister = () => {
  const checkEmail = (input: string) => {
    const emailRegEx =
      /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/;

    return emailRegEx.test(input);
    // return true;
  };

  const dupCheckEmail = async (input: string) => {
    if (checkEmail(input) === false) {
      toast.error("이메일이 올바르지 않습니다.");
      return false;
    } else {
      const EmailData: EmailData = {
        email: input,
      };

      const EmailDTO: EmailDTO = {
        data: EmailData,
      };

      const dupCheck = await EmailCheck(EmailDTO);

      if (dupCheck === true) {
        toast.warn("이미 존재하는 이메일 입니다.");
        return false;
      }
      //dupCheck가 true 면 중복 // emailCheck가 true여야 이메일 규격
      return true;
    }
  };

  const checkPassword = (input: string) => {
    const passwordRegEx =
      /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/;

    return passwordRegEx.test(input);
  };

  const register = async (inputData: RegisterData) => {
    const inputDTO: RegisterDTO = {
      data: inputData,
    };

    const result = await postRegister(inputDTO);

    if (result === 200) {
      toast.success("회원가입 성공");
      return true;
    } else {
      toast.error("회원가입 실패");
      return false;
    }
  };

  return { checkEmail, checkPassword, register, dupCheckEmail };
};

export default useRegister;
