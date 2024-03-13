const useRegister = () => {
  const checkEmail = (input: string) => {
    const emailRegEx =
      /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/;

    return emailRegEx.test(input);
    // return true;
  };

  return { checkEmail };
};

export default useRegister;
