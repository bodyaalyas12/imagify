const emailValidation = ({ email: value = "" }) => {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!re.test(value.toLowerCase())) {
    return "Invalid email";
  }
  return undefined;
};

const passwordValidation = ({ password: value }: { password: string }) => {
  if (value.length < 6 || value.length > 30) {
    return "Password must be from 6 to 30 symbols";
  }
  return undefined;
};

export default {
  email: emailValidation,
  password: passwordValidation,
};
