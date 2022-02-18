const AuthService = require('../services/AuthServices')

async function Login(req, res) {

    const email = req.body.email
    const password = req.body.password
    try {
              
        const AuthServiceInstance = new AuthService()
        const {userId, token, errorMessage} = await AuthServiceInstance.serviceLogin(email,password)
        if(errorMessage){
            return res.status(400).json({error: errorMessage})
        } 

        return res.json({ error: null, msg: "voce está autenticado!", token: token, userId: userId })

    } catch (err) {
        return res.status(400).json( {error: 'Falha de Autenticação'} )
    }
}
async function Register(req, res) {
    const name = req.body.name
    const email = req.body.email
    const password = req.body.password
    const confirmPassword = req.body.confirmPassword
    try{
        const AuthServiceInstance = new AuthService()
        const {userId, token, errorMessage} = await AuthServiceInstance.serviceRegister(name,email,password,confirmPassword)
        if(errorMessage){
            return res.status(400).json({error: errorMessage})
        } 
        return res.json({ error: null, msg: "voce se cadastrou!", token: token, userId: userId })
    }catch(err){
        return res.status(400).json( {error: 'Falha de Cadastro'} )
    }

}
module.exports = { 
    Login,
    Register
}
