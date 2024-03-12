const useRegister = () => {
  const checkEmail = (input: string) => {
    // const regExp =
    //   /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    // 형식에 맞는 경우 true 리턴

    // return regExp.test(input);
    return true;
  };

  return { checkEmail };
};

export default useRegister;
