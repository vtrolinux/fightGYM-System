const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

require('dotenv').config()

module.exports = class AuthService {
    constructor(){}

    async serviceLogin(email, password) {

        //check if email exists
        const user = await User.findOne({ email: email })

        try{
            if(!user){
                return {errorMessage: 'não há usuário cadastrado com esse email'}
            }

            //check match senha
            const checkPassword = await bcrypt.compare(password, user.password)

            if (!checkPassword) {
                return {errorMessage: 'senha inválida'}
            }
            //cria token e autentica
            const token = jwt.sign(
                //payload
                {
                    name: user.name,
                    id: user._id
                },
            process.env.JWT_SECRET,
            )
            return {
                userId: user._id,
                token: token,  
            }
        }catch(err){
            return {errorMessage: 'Falha ao efetuar o Login'}
        }       
    }
}

