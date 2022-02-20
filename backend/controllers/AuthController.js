const AuthService = require('../services/AuthServices')
const authValidators = require('../validations/authValidators')

async function Login(req, res) {

    const {email, password} = req.body

    // input validator
    try{
        authValidators.loginValidator(email, password)
    }catch(err){
        return res.status(422).json({ error: err.message })
    }

    //service call
    try {
              
        const AuthServiceInstance = new AuthService()
        const {token, userId} = await AuthServiceInstance.serviceLogin(email,password)

        return res.json({ error: null, message: "voce está autenticado!", token: token, userId: userId })

    } catch (err) {
        if(!err.status){
            return res.status(500).json( { error: { code: 'UNKNOWN_ERROR', message: 'An unknown error occurred.' } })
        }
        return res.status(err.status).json( { error: { code: err.code, message: err.message } })
    }
}
async function Register(req, res) {

    const {name, email, password, confirmPassword} = req.body
    //input validator
    try{
        authValidators.registerValidator(name, email, password, confirmPassword)
    }catch(err){
        return res.status(422).json({ error: err.message })
    }

    //call service
    try{
        const AuthServiceInstance = new AuthService()
        const {token, userId} = await AuthServiceInstance.serviceRegister(name,email,password)

        return res.json({ error: null, message: "voce se cadastrou!", token: token, userId: userId })
    }catch(err){
        if(!err.status){
            return res.status(500).json( { error: { code: 'UNKNOWN_ERROR', message: 'An unknown error occurred.' } })
        }
        return res.status(err.status).json( { error: { code: err.code, message: err.message } })
    }

}
module.exports = { 
    Login,
    Register
}
