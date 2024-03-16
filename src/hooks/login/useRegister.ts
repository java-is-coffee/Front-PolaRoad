import postRegister, {
  RegisterDTO,
  RegisterData,
} from "../../api/login/postRegister";

const useRegister = () => {
  const checkEmail = (input: string) => {
    const emailRegEx =
      /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/;

    return emailRegEx.test(input);
    // return true;
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
      return 200;
    } else return 400;
  };

  return { checkEmail, checkPassword, register };
};

export default useRegister;
