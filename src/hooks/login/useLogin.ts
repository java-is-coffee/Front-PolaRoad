import { useNavigate } from "react-router-dom";
import postLogin, { LoginDTO, LoginData } from "../../api/login/postLogin";
import { toast } from "react-toastify";

const useLogin = () => {
  const navigate = useNavigate();

  const Login = async (inputData: LoginData) => {
    const inputDTO: LoginDTO = {
      data: inputData,
    };

    const result = await postLogin(inputDTO);

    if (result) {
      localStorage.setItem("accessToken", result.accessToken);
      localStorage.setItem("refreshToken", result.refreshToken);
      toast.success("로그인 성공");
      navigate("/explore");
    } else {
      toast.error("로그인 실패");
    }
  };

  return { Login };
};

export default useLogin;
