function errorMessage(type) {
  const messages = {
    emptyValue: "Este campo deve ser preenchido",
    passwordMatch: "As Senhas Precisam ser iguais",
    passwordLength: "Senha precisa ter no mínimo de 6 caracteres",
    passwordUpperCase: "Senha precisa ter no mínimo uma letra MAIÚSCULA",
    passwordLowerCase: "Senha precisa ter no mínimo uma letra minúscula",
    passwordNumber: "Senha precisa ter no mínimo um número",
  };

  return messages[type];
}

export default errorMessage;
