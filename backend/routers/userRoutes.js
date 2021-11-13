const router = require('express').Router()
const bcrypt = require('bcrypt')
//middleware de verificação token
const verifyToken = require('../helpers/check-token')
//helpers
const getUserByToken = require('../helpers/get-user-by-token')

const User = require('../models/user')

//buscar o usuario pelo id
router.get('/:id',verifyToken, async(req,res)=>{
    console.log('bati')
    try{
        const id = req.params.id
        console.log(id)
        const user = await User.findOne({_id: id}, {password: 0})
        console.log(user)
        return res.json({error: null, user})
        // nao retornar senha na busca
        // implementar mais filtros para garantir que o usuário consiga ver as informações apenas referentes ao SEU ID
    }catch(error){
        return res.status(400).json({error: 'usuário não encontrado!'})
    }
    
})
// update de informacoes do usuario pelo mesmo (+segurança)
router.patch('/',verifyToken, async(req,res)=>{
    console.log(req)
    const token = req.header('auth-token')
    const user = await getUserByToken(token)

    const userReqId = req.body.id
    const password = req.body.password
    const confirmPassword = req.body.confirmPassword

    //verifica se o ID de usuário é igual ao token ID(prevenir manipulação de token durante requests)
    const userId = user._id.toString()
    if(userId != userReqId){
        console.log('passei userId != userReqId')
        return res.status(401).json({error: 'Acesso Negado!'})
    }
    //Objeto de update do usuário
    const updateData = {
        name: req.body.name,
        email: req.body.email
    }
    if(password != confirmPassword){
        return res.status(401).json({error: 'As senhas não conferem!'})
    }else if(password == confirmPassword && password != null){
        //change password
        const salt = await bcrypt.genSalt(12)
        const passwordHash = await bcrypt.hash(password,salt)
        //adiciona senha ao update
        updateData.password = passwordHash
    }
    try{
        //retorna dado atualizado data:updatedUser
        const updatedUser = await User.findOneAndUpdate({_id: userId},{$set: updateData},{new: true})
        res.json({error:null,msg: 'Dado atualizado com sucesso.', data: updatedUser}) // {new true} retorna os dados atualizados, false retorna antes de atualizar(padrão)
    }catch(error){

    }

})

module.exports = router