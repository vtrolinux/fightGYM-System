const validator = require('validator')

const registerValidator = (name, email, password, confirmpassword) => {
    if (!name) {
        throw new Error('O nome é obrigatório!')
    }
    if (!email) {
        throw new Error('O e-mail é obrigatório!')
    }
    if (validator.isEmail(email) === false) {
        throw new Error('o campo informado nao e um email valido!')
    }
    //console.log( validator.isStrongPassword(password,[{ minLength: 8}]) )  
    if (!password) {
        throw new Error('A senha é obrigatória!')  
    }
    if (!confirmpassword) {
        throw new Error('A confirmação de senha é obrigatória!')   
    }
    if (password != confirmpassword) {
        throw new Error('A senha e a confirmação precisam ser iguais!')
    }
}
const loginValidator = (email, password) => {

    if (!email) {
        throw new Error('O e-mail é obrigatório!')  
    }
    if (validator.isEmail(email) === false) {
        throw new Error('o campo informado nao e um email valido!')       
    }
    if (!password) {
        throw new Error('A senha é obrigatória!')     
    }
}

module.exports = {
    registerValidator,
    loginValidator,
}