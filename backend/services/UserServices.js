const User = require('../models/user')
const getUserByToken = require('../helpers/get-user-by-token')
const bcrypt = require('bcrypt')

module.exports = class UserServices{
    constructor(){}

    async serviceGetUserInfo(id, token) {
        console.log('id: '+id)
 
        const user = await getUserByToken(token)
        const userId = user._id.toString()

        //verifica se o ID de usuário é igual ao token ID      
        if (userId != id) {
            console.log('-> violacao de acesso: userId != Id: ' + userId + ' != ' + id)
            //tentativa de violação de acesso, criar relatório, informar administrador do sistema, email
            throw ({ status: 422, code: 'FAIL_OPERATION', message: 'Acesso não autorizado!' })
        }

        try {

            console.log(id)
            // nao retornar senha 
            const user = await User.findOne({ _id: id }, { password: 0 })
            console.log(user)
            return { user }
            
        } catch (err) {
            throw ({ status: 422, code: 'FAIL_OPERATION', message: 'usuário não encontrado' })
        }
    }
    async serviceUserUpdate(id, name, email, password, confirmPassword, token){

        console.log('body service: '+ name)
        const user = await getUserByToken(token)

        //verifica se o ID de usuário é igual ao token ID(prevenir manipulação de token durante requests)
        const userId = user._id.toString()
        const userReqId = id
        console.log('userId:  ' + userId + ' e userReqId: ' + userReqId)
        if (userId != userReqId) {
            console.log('passei userId != userReqId: ' + userId + ' != ' + userReqId)
            throw ({ status: 422, code: 'FAIL_OPERATION', message: 'Acesso não autorizado!' })
        }
        //Objeto de update do usuário
        const updateData = {
            name,
            email
        }
        if (password != confirmPassword) {
            throw ({ status: 422, code: 'FAIL_OPERATION', message: 'As senhas não conferem!' })
        } else if (password == confirmPassword && password != null) {
            //change password
            const salt = await bcrypt.genSalt(12)
            const passwordHash = await bcrypt.hash(password, salt)
            //adiciona senha ao update
            updateData.password = passwordHash
        }
        try {
            //retorna dado atualizado data:updatedUser
            const updatedUser = await User.findOneAndUpdate({ _id: userId }, { $set: updateData }, { new: true }).select({password: 0, __v: 0 })       
            return { updatedUser } // {new true} retorna os dados atualizados, false retorna antes de atualizar(padrão)

        } catch (err) {
            throw ({ status: 422, code: 'FAIL_OPERATION', message: 'Erro, tente novamente mais tarde' })
        }

    }
}