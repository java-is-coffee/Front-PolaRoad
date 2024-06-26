import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

interface ErrorProps {
  errorType: "PATH" | "AUTH";
  path?: string;
}

const useErrorHandler = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const displayErrorToast = (errorType: "PATH" | "AUTH") => {
    const errorMessages = {
      PATH: "잘못된 접근입니다.",
      AUTH: "로그인이 필요합니다.",
    };
    toast.error(errorMessages[errorType]);
  };

  const navigateOnError = ({ errorType, path }: ErrorProps) => {
    displayErrorToast(errorType);

    if (path) {
      navigate(path, { state: { from: location.pathname } });
    } else {
      navigate(-1);
    }
  };

  return { navigateOnError };
};

export default useErrorHandler;
