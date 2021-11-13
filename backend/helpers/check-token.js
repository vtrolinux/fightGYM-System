const jwt = require('jsonwebtoken')
const credentials = require('../credentials.json')


//middleware para verificação de autenticação
const checkToken = (req, res, next)=>{
    const token = req.header('auth-token')
    console.log('token: '+ token)
    console.log(credentials.secret)
    if(!token){
        return res.status(401).json({error: "Acesso Negado"})
    }
    //try valida token efetivo
    try{
        const verificado = jwt.verify(token, "VamosTodosMorrer")
        req.user = verificado
        next()
    }catch(error){
        res.status(400).json({error: 'acesso negado: token inválido'})
    }
}
module.exports = checkToken