function validatePassword(password) {
  let passwordError = { error: false, type: "" };
  const passwordLength = password.length < 6;
  const passwordUpper = password.match("^(?=.*?[A-Z])");
  const passwordLower = password.match("^(?=.*?[a-z])");
  const passwordNumber = password.match("^(?=.*?[0-9])");

  if (passwordLength) {
    passwordError.error = true;
    passwordError.type = passwordLength ? "passwordLength" : "";
    return passwordError;
  }

  if (!passwordUpper) {
    passwordError.error = true;
    passwordError.type = !passwordUpper ? "passwordUpperCase" : "";
    return passwordError;
  }

  if (!passwordLower) {
    passwordError.error = true;
    passwordError.type = !passwordLower ? "passwordLowerCase" : "";
    return passwordError;
  }

  if (!passwordNumber) {
    passwordError.error = true;
    passwordError.type = !passwordNumber ? "passwordNumber" : "";
    return passwordError;
  }

  return passwordError;
}

export default validatePassword;
