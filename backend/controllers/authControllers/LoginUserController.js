const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../../models/user')
require('dotenv').config()

module.exports = class AuthController {

    static async Login(req, res) {

        const email = req.body.email
        const password = req.body.password
        console.log(req.body)

        //check if email exists
        const user = await User.findOne({ email: email })

        if (!user) {
            return res.status(400).json({ error: "não há usuário cadastrado com esse email" })
        }
        //check match senha
        const checkPassword = await bcrypt.compare(password, user.password)
        if (!checkPassword) {
            console.log('checkMatch senha: ' + checkPassword)
            return res.status(400).json({ error: "senha inválida" })
        }

        //cria token e autentica
        const token = jwt.sign(
            //payload
            {
                name: user.name,
                id: user._id
            },
            process.env.JWT_SECRET, 
        )
        return res.json({ error: null, msg: "voce está autenticado!", token: token, userId: user._id })

    }
}