function verifyPassword(password) {
    const errorMessage = {
        length: '',
        upperCase: '',
        lowerCase: '',
        number: ''
    }
    const passwordLength =  password.length < 6
    passwordLength ? errorMessage.length = "Senha precisa ter no mínimo de 6 caracteres" : errorMessage.length = '';

    const passwordUpper = password.match("^(?=.*?[A-Z])")
    !passwordUpper ? errorMessage.upperCase = "Senha precisa ter no mínimo uma letra MAIÚSCULA" : errorMessage.upperCase = '';

    const passwordLower = password.match("^(?=.*?[a-z])")
    !passwordLower ? errorMessage.lowerCase = "Senha precisa ter no mínimo uma letra minúscula" : errorMessage.lowerCase = '';

    const passwordNumber = password.match("^(?=.*?[0-9])")
    !passwordNumber ? errorMessage.number = "Senha precisa ter no mínimo um número" : errorMessage.number = '';

    return errorMessage
}

export default verifyPassword;