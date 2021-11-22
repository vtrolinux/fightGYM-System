const jwt = require('jsonwebtoken')
const User = require('../models/user')

const getUserByToken = async(token)=>{
    
    if(!token){
        return res.status(400).json({error: "Acesso negado: token inválido"})
    }
    const decodificado = jwt.verify(token, process.env.JWT_SECRET)
    console.log('decode: '+decodificado.id)
    

    const userId = decodificado.id
    const user = await User.findOne({_id: userId})
    return user

}
module.exports = getUserByToken