const User = require('../models/user')
const getUserByToken = require('../helpers/get-user-by-token')

module.exports = class UserServices{
    constructor(){}

    async serviceGetUserInfo(id, token) {
        console.log('bati user service')
        console.log('id: '+id)
      /*  const id = req.params.id
        console.log('bati')
        
        //pegar id de usuario pelo token
        const token = req.header('auth-token')
        */
        const user = await getUserByToken(token)
        const userId = user._id.toString()

        //verifica se o ID de usuário é igual ao token ID      
        if (userId != id) {
            console.log('passei userId != Id: ' + userId + ' != ' + id)
            //tentativa de violação de acesso, criar relatório, informar administrador do sistema
            return { errorMessage: 'Acesso Negado!' }
        }

        try {

            console.log(id)
            const user = await User.findOne({ _id: id }, { password: 0 })
            console.log(user)
            return { user: user }
            // nao retornar senha na busca
            // implementar mais filtros para garantir que o usuário consiga ver as informações apenas referentes ao SEU ID
        } catch (err) {
            return { errorMessage: 'usuário não encontrado!' }
        }
    }
}