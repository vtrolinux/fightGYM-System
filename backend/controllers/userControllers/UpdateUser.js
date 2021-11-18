const User = require('../../models/user')
const getUserByToken = require('../../helpers/get-user-by-token')
const bcrypt = require('bcrypt')

module.exports = class UpdateUser {

    static async updateUserInfo(req, res) {

        const token = req.header('auth-token')
        const user = await getUserByToken(token)

        const userReqId = req.body.id
        const password = req.body.password
        const confirmPassword = req.body.confirmPassword

        //verifica se o ID de usuário é igual ao token ID(prevenir manipulação de token durante requests)
        const userId = user._id.toString()
        if (userId != userReqId) {
            console.log('passei userId != userReqId: ' + userId + ' != ' + userReqId)
            return res.status(401).json({ error: 'Acesso Negado!' })
        }
        //Objeto de update do usuário
        const updateData = {
            name: req.body.name,
            email: req.body.email
        }
        if (password != confirmPassword) {
            return res.status(401).json({ error: 'As senhas não conferem!' })
        } else if (password == confirmPassword && password != null) {
            //change password
            const salt = await bcrypt.genSalt(12)
            const passwordHash = await bcrypt.hash(password, salt)
            //adiciona senha ao update
            updateData.password = passwordHash
        }
        try {
            //retorna dado atualizado data:updatedUser
            const updatedUser = await User.findOneAndUpdate({ _id: userId }, { $set: updateData }, { new: true })
            res.json({ error: null, msg: 'Dado atualizado com sucesso.', data: updatedUser }) // {new true} retorna os dados atualizados, false retorna antes de atualizar(padrão)
        } catch (err) {
            return res.json({ error: 'Erro, tente novamente mais tarde' })
        }
    }
}
