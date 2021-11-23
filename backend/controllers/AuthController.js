const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/user')
require('dotenv').config()
const { serviceLogin, serviceRegister } = require('../service/AuthServices')
const AuthService = require('../service/AuthServices')


async function Login(req, res) {

    const email = req.body.email
    const password = req.body.password

    console.log(req.body)
    try {
              
        const AuthServiceInstance = new AuthService()
        const {userId, token, erro} = await AuthServiceInstance.serviceLogin(email,password)
        console.log(userId)
        console.log(token)
        console.log('error controller: '+erro)
        //console.log('error controller: '+e.message)
        console.log(erro)
        if(erro){
            console.log('tem erro')
            throw erro
        }
        return res.json({ error: null, msg: "voce está autenticado!", token: token, userId: userId })
        //return res.send(Login);
    } catch (err) {
        return res.status(400).json( {err} )
    }
}
module.exports = { Login }
/*
module.exports = class AuthController {

    static async Login(req, res) {

        const email = req.body.email
        const password = req.body.password
        console.log(req.body)

        //check if email exists
        const user = await User.findOne({ email: email })

        if (!user) {
            return res.status(400).json({ error: "não há usuário cadastrado com esse email" })
        }
        //check match senha
        const checkPassword = await bcrypt.compare(password, user.password)
        if (!checkPassword) {
            console.log('checkMatch senha: ' + checkPassword)
            return res.status(400).json({ error: "senha inválida" })
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
        return res.json({ error: null, msg: "voce está autenticado!", token: token, userId: user._id })

    }

    static async register(req, res){

        const name = req.body.name
        const email = req.body.email
        const password = req.body.password
        const confirmPassword = req.body.confirmPassword
        console.log(req.body)
        //check for require
        if (name === null || email === null || password === null || confirmPassword === null) {
            console.log('passei null')
            return res.status(400).json({ error: "por favor preencha todos os campos" });
        }
        if (password != confirmPassword) {
            return res.status(400).json({ error: "As senhas não são iguais" })
        }
        //check se usuário já existe
        const emailExists = await User.findOne({ email: email })
        if (emailExists) {
            console.log("O email informado já está em uso")
            return res.status(400).json({ error: "O email informado já está em uso" })
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
            res.json({ error: null, msg: "voce se cadastrou!", token: token, userId: newUser._id })
        } catch (error) {
           return res.status(404).json({ error })
        }
    }
}
*/