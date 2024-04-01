import { useLocation, useNavigate } from "react-router-dom";
import postLogin, { LoginDTO, LoginData } from "../../api/login/postLogin";
import { toast } from "react-toastify";
import secureLocalStorage from "react-secure-storage";

const useLogin = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const Login = async (inputData: LoginData) => {
    const inputDTO: LoginDTO = {
      data: inputData,
    };

    const result = await postLogin(inputDTO);

    if (result === 200) {
      const from = location.state?.from?.pathname || "/explore"; // 이전 페이지가 없다면 '/explore'로 설정
      navigate(from);
    } else {
      toast.error("로그인 실패");
    }
  };

  const LogOut = () => {
    secureLocalStorage.clear();
    navigate("/login");
  };

  const MyPage = () => {
    navigate("/my");
  };

  return { Login, LogOut, MyPage };
};

export default useLogin;
