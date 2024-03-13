import postLogin, { LoginDTO, LoginData } from "../../api/login/postLogin";

const useLogin = () => {
  const Login = async (inputData: LoginData) => {
    const inputDTO: LoginDTO = {
      data: inputData,
    };

    const result = await postLogin(inputDTO);

    // 성공
    if (result === 200) {
      console.log("로그인 성공");
    }
  };

  return { Login };
};

export default useLogin;
