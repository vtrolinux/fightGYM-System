const validator = require('validator')

const updateValidator = (id, name, email, password, confirmPassword) => {
    if (!name) {
        throw new Error('O nome é obrigatório!')
    }
    if (!email) {
        throw new Error('O e-mail é obrigatório!')
    }
    if (validator.isEmail(email) === false) {
        throw new Error('o campo informado não é um e-mail válido!')
    }
    //console.log( validator.isStrongPassword(password,[{ minLength: 8}]) )  
    if (!password) {
        throw new Error('A senha é obrigatória!')  
    }
    if (!confirmPassword) {
        throw new Error('A confirmação de senha é obrigatória!')   
    }
    if (password != confirmPassword) {
        throw new Error('A senha e a confirmação precisam ser iguais!')
    }
}

module.exports = {
    updateValidator
}