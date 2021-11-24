const UserServices = require('../services/UserServices')

async function getUserInfo(req, res) {

    const id = req.params.id
        //pegar id de usuario pelo token
    const token = req.header('auth-token')

    try{
    const UserServicesInstance = new UserServices()
    const {user, errorMessage} = await UserServicesInstance.serviceGetUserInfo(id, token)
        if(errorMessage){
            return res.status(400).json({error: errorMessage})
        }

        return res.json({ error: null, user: user })

    }catch(err){
        return res.status(400).json({ error: 'usuário não encontrado!' })
    }

}
async function updateUserInfo(req, res) {

}

module.exports = {
    getUserInfo,
    updateUserInfo
}