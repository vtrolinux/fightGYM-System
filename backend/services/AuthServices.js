const User = require('../models/user')
const bcrypt = require('bcrypt')
const createToken = require('../helpers/create-token')

module.exports = class AuthService {
    constructor(){}

    async serviceLogin(email, password) {

        //check if email exists
        const user = await User.findOne({ email: email })

            if(!user){
                throw ({ status: 422, code: 'EMAIL_NOT_EXISTS', message: 'nao existe usuario cadastrado com este email.' })
            }

            //check match senha
            const checkPassword = await bcrypt.compare(password, user.password)

            if (!checkPassword) {
                throw ({ status: 422, code: 'INVALID_PASSWORD', message: 'senha inválida.' })
            }
            //cria token e autentica
            const {token, userId} = await createToken(user)

            return {token, userId}
     
    }
    
    async serviceRegister(name, email, password){
       
        //check se usuário já existe
        const emailExists = await User.findOne({ email: email })
        if (emailExists) {
            console.log("O email informado já está em uso")
            throw ({ status: 422, code: 'EMAIL_EXISTS', message: 'O email informado já está em uso.' })
        }
        
        // create password
        const salt = await bcrypt.genSalt(12)
        const passwordHash = await bcrypt.hash(password, salt)
        console.log(passwordHash)
        // registro de usuario no sistema
        const user = new User({
            name: name,
            email: email,
            password: passwordHash
        })
        
        try {           
            const newUser = await user.save()
            
            //cria token e autentica
            const {token, userId} = await createToken(newUser)

            return {token, userId}
        } catch (err) {
            throw ({ status: 422, code: 'USER_ERROR_REGISTER', message: 'Erro ao registrar usuario.' })
        }
                      
    }
}

