const credentials = require('../credentials.json')
const User = require('../models/user')
const getUserByToken = require('../helpers/get-user-by-token')

//middleware para verificação de autenticação
const verifyFieldADM = async (req, res, next)=>{
    const token = req.header('auth-token')
    //console.log('token: '+ token)
    //console.log(credentials.secret)
    if(!token){
        return res.status(401).json({error: "Acesso Negado"})
    }
    try{
        const userByToken = await getUserByToken(token)
        const userId = userByToken._id.toString()
        //console.log('userId: '+userId)
        const user = await User.findOne({_id: userId},{password: 0})
        console.log('verifyfieldADM: '+user)
        if(user._doc.hasOwnProperty("adm") && user._doc.adm === true){           
            console.log('TEM ADM, segue o fluxo')
            next()
        }else {
            return res.status(403).json({error: 'acesso negado!'})
        }    
    }catch(err){
        return res.status(400).json({error: 'acesso negado: token inválido'})
    }
}
module.exports = verifyFieldADM