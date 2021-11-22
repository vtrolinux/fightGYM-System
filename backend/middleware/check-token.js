const jwt = require('jsonwebtoken')
require('dotenv').config()
const credentials = require('../credentials.json')


//middleware para verificação de autenticação
const checkToken = (req, res, next)=>{
    const token = req.header('auth-token')
    //console.log('token: '+ token)
    //console.log(credentials.secret)
    if(!token){
        return res.status(401).json({error: "Acesso Negado"})
    }
    //try valida token efetivo
    try{
        console.log('secret: '+process.env.JWT_SECRET)
        const verificado = jwt.verify(token, process.env.JWT_SECRET)
        req.user = verificado
        //console.log('req.user: '+verificado)
        next()
    }catch(error){
        res.status(400).json({error: 'acesso negado: token inválido'})
    }
}
module.exports = checkToken