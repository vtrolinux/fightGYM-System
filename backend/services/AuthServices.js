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

            return { userId: user._id, token: token}

        }catch(err){
            return {errorMessage: 'Falha ao efetuar o Login'}
        }       
    }
    
    async serviceRegister(name, email, password, confirmPassword){

        if (name === null || email === null || password === null || confirmPassword === null) {
            console.log('passei null')
            return {errorMessage: 'Preencha os campos'}
        }
        if (password != confirmPassword) {
            return {errorMessage: 'As senhas não conferem'}
        }
        //check se usuário já existe
        const emailExists = await User.findOne({ email: email })
        if (emailExists) {
            console.log("O email informado já está em uso")
            return {errorMessage: 'O email informado já está em uso'}
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
            const token = jwt.sign(
                //payload
                {
                    name: newUser.name,
                    id: newUser._id
                },
                process.env.JWT_SECRET
            )

            return {token: token, userId: newUser._id}
            
        } catch (err) {
            return {errorMessage: 'Falha ao Realizar Cadastro!'}
        }
    }
}

