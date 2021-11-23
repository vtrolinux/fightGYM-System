const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


require('dotenv').config()

module.exports = class AuthService {
    constructor(){}

    async serviceLogin(email, password) {

        try {
            throw "I'm Evil"
            console.log("You'll never reach to me", 123465)
          } catch (e) {
            console.log(e); // I'm Evil
          }
          try {
            throw new Error("I'm Evil")
            console.log("You'll never reach to me", 123465)
          } catch (e) {
            console.log(e.name, e.message); // Error I'm Evil
          }
        //check if email exists
        const user = await User.findOne({ email: email })
        try{
            if(!user){
                throw new Error('não há usuário cadastrado com esse email')
            }

            //check match senha
            const checkPassword = await bcrypt.compare(password, user.password)

            if (!checkPassword) {
                throw new Error('Incorrect password')
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
        }catch(e){
            console.log('catch service: '+e.name)
            console.log(e.message)
            console.log('type:' + typeof(e.message))
            return {erro:e.message}
        }
        /*
        //check if email exists
        const user = await User.findOne({ email: email })
        console.log('usuario buscado: '+user._id)
        if (!user) {
            console.log('!user')
            throw new Error('não há usuário cadastrado com esse email')
        } 
        //check match senha
        const checkPassword = await bcrypt.compare(password, user.password)

        if (!checkPassword) {
            console.log('checkMatch senha: ' + checkPassword)
            throw new Error('Incorrect password')
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
        */
        
    }
}
/*
    //check if email exists
    const user = await User.findOne({ email: email })

    if(!user) {
        return res.status(400).json({ error: "não há usuário cadastrado com esse email" })
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





async function serviceLogin(){

}
async function serviceRegister(){

}

module.exports = {
    serviceLogin,
    serviceRegister
}
*/
