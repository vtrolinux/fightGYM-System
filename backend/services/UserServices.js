const User = require('../models/user')
const getUserByToken = require('../helpers/get-user-by-token')
const bcrypt = require('bcrypt')

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
            return { user }
            // nao retornar senha na busca
            // implementar mais filtros para garantir que o usuário consiga ver as informações apenas referentes ao SEU ID
        } catch (err) {
            return { errorMessage: 'usuário não encontrado!' }
        }
    }
    async serviceUserUpdate(token, body){

        console.log('body service: '+body.name)
        const user = await getUserByToken(token)

        //verifica se o ID de usuário é igual ao token ID(prevenir manipulação de token durante requests)
        const userId = user._id.toString()
        const userReqId = body.id
        console.log('userId:  ' + userId + ' e userReqId: ' + userReqId)
        if (userId != userReqId) {
            console.log('passei userId != userReqId: ' + userId + ' != ' + userReqId)
            return { errorMessage: 'Acesso Negado!' }
        }
        //Objeto de update do usuário
        const updateData = {
            name: body.name,
            email: body.email
        }
        if (body.password != body.confirmPassword) {
            return { errorMessage: 'As senhas não conferem!' }
        } else if (body.password == body.confirmPassword && body.password != null) {
            //change password
            const salt = await bcrypt.genSalt(12)
            const passwordHash = await bcrypt.hash(body.password, salt)
            //adiciona senha ao update
            updateData.password = passwordHash
        }
        try {
            //retorna dado atualizado data:updatedUser
            const updatedUser = await User.findOneAndUpdate({ _id: userId }, { $set: updateData }, { new: true }).select({password: 0, __v: 0 })       
            return { updatedUser } // {new true} retorna os dados atualizados, false retorna antes de atualizar(padrão)

        } catch (err) {
            return { errorMessage: 'Erro, tente novamente mais tarde' }
        }

    }
}