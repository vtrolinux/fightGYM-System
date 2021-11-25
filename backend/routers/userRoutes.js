const router = require('express').Router()
//middleware de verificação token
const verifyToken = require('../middleware/check-token')
const UserController = require('../controllers/UserController')

//buscar o usuario pelo id
router.get('/:id', verifyToken, UserController.getUserInfo)

//autalizacao de informacoes do usuario pelo mesmo
router.patch('/', verifyToken, UserController.updateUserInfo)

module.exports = router