const useRegister = () => {
  const checkEmail = (input: string) => {
    const emailRegEx =
      /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/;

    return emailRegEx.test(input);
    // return true;
  };

  const checkPassword = (input: string) => {
    const passwordRegEx =
      /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/;

    return passwordRegEx.test(input);
  };

  return { checkEmail, checkPassword };
};

export default useRegister;
