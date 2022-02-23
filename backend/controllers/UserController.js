const UserServices = require('../services/UserServices')
const inputValidators = require('../validations/inputValidators')

async function getUserInfo(req, res) {

    const id = req.params.id
    //pegar id de usuario pelo token
    const token = req.header('auth-token')
    
    try {
        inputValidators.paramIdValidator(id)
    } catch (err) {
        return res.status(422).json({ error: err.message })
    }

    try {
        const UserServicesInstance = new UserServices()
        const { user } = await UserServicesInstance.serviceGetUserInfo(id, token)

        return res.json({ error: null, user: user })

    } catch (err) {
        if(!err.status){
            return res.status(500).json( { error: { code: 'UNKNOWN_ERROR', message: 'An unknown error occurred.' } })
        }
        return res.status(err.status).json( { error: { code: err.code, message: err.message } })
    }

}
async function updateUserInfo(req, res) {

    const token = req.header('auth-token')   

    try {
        const UserServicesInstance = new UserServices()
        const { updatedUser, errorMessage } = await UserServicesInstance.serviceUserUpdate(token, req.body)
        if (errorMessage) {
            return res.status(400).json({ error: errorMessage })
        }

        return res.json({ error: null, msg: 'Dado atualizado com sucesso.', data: updatedUser })

    } catch (err) {
        return res.status(400).json({ error: 'falha na alteração dos dados' })
    }

}

module.exports = {
    getUserInfo,
    updateUserInfo
}