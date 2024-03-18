import postLogin, { LoginDTO, LoginData } from "../../api/login/postLogin";

const useLogin = () => {
  const Login = async (inputData: LoginData) => {
    const inputDTO: LoginDTO = {
      data: inputData,
    };

    const result = await postLogin(inputDTO);

    if (result === 200) {
      return 200;
    } else return 400;
  };

  return { Login };
};

export default useLogin;
