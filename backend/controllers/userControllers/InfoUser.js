const User = require('../../models/user')

module.exports = class InfoUser {

    static async getUserInfo(req, res) {
        
        console.log('bati')
        const id = req.params.id
        //pegar id de usuario pelo token
        const token = req.header('auth-token')
        const user = await getUserByToken(token)
        const userId = user._id.toString()

        //verifica se o ID de usuário é igual ao token ID      
        if (userId != id) {
            console.log('passei userId != Id: ' + userId + ' != ' + id)
            return res.status(401).json({ error: 'Acesso Negado!' })
        }

        try {

            console.log(id)
            const user = await User.findOne({ _id: id }, { password: 0 })
            console.log(user)
            return res.json({ error: null, user })
            // nao retornar senha na busca
            // implementar mais filtros para garantir que o usuário consiga ver as informações apenas referentes ao SEU ID
        } catch (error) {
            return res.status(400).json({ error: 'usuário não encontrado!' })
        }
    }
}