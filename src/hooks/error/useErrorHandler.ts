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
        // 아래 줄의 경우 my페이지로 바로 이동 하게 끔 유도하는 주석 입니다. 이를 활용하고자 한다면 props로 location.pathname값만 받아오면 바로 해당 페이지로 이동할 수 있게 도와줄 수 있을 것 같습니다.
        //추가 안한 이유는 많은 곳에서 사용되는 함수이기에 제가 함부로 작성하면 오류날 수 있다고 판단되어 주석으로 해뒀습니다.
        // navigate(path, {
        //   state: {
        //     from: "/my",
        //   },
        // });
      } else {
        navigate(-1);
      }
    }, 2000);
  };

  return { navigateOnError };
};

export default useErrorHandler;
