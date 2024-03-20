import { useNavigate } from "react-router-dom";
import postLogin, { LoginDTO, LoginData } from "../../api/login/postLogin";
import { toast } from "react-toastify";
import secureLocalStorage from "react-secure-storage";

const useLogin = () => {
  const navigate = useNavigate();

  const Login = async (inputData: LoginData) => {
    const inputDTO: LoginDTO = {
      data: inputData,
    };

    const result = await postLogin(inputDTO);

    if (result) {
      secureLocalStorage.setItem("accessToken", result.accessToken);
      secureLocalStorage.setItem("refreshToken", result.refreshToken);
      navigate("/explore");
    } else {
      toast.error("로그인 실패");
    }
  };

  return { Login };
};

export default useLogin;
