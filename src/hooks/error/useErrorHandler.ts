import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

interface ErrorProps {
  errorType: "PATH" | "AUTH";
  path?: string;
}

const useErrorHandler = () => {
  const navigate = useNavigate();

  const displayErrorToast = (errorType: "PATH" | "AUTH") => {
    const errorMessages = {
      PATH: "잘못된 접근입니다.",
      AUTH: "로그인이 필요합니다.",
    };

    toast.error(errorMessages[errorType]);
  };

  const navigateOnError = ({ errorType, path }: ErrorProps) => {
    displayErrorToast(errorType);
    // 토스트 메시지가 일정 시간 동안 표시된 후 페이지를 이동합니다.
    setTimeout(() => {
      if (path) {
        navigate(path);
      } else {
        navigate(-1);
      }
    }, 2000);
  };

  return { navigateOnError };
};

export default useErrorHandler;
