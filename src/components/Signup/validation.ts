import validation from "../Login/validation";

const passwordValidation = ({ password, confirmPassword }: { password: string; confirmPassword: string }) => {
  if (password && confirmPassword && password !== confirmPassword) {
    return "Passwords must be equal";
  }
  return validation.password({ password });
};

const confirmPasswordValidation = ({ password, confirmPassword }: { password: string; confirmPassword: string }) => {
  if (password && confirmPassword && password !== confirmPassword) {
    return "Passwords must be equal";
  }
  return undefined;
};

export default {
  ...validation,
  password: passwordValidation,
  confirmPassword: confirmPasswordValidation,
};
