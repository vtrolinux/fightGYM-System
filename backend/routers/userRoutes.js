const router = require('express').Router()
//middleware de verificação token
const verifyToken = require('../middleware/check-token')
const InfoUser = require('../controllers/userControllers/InfoUser')
const UpdateUser = require('../controllers/userControllers/UpdateUser')

//buscar o usuario pelo id
router.get('/:id', verifyToken, InfoUser.getUserInfo)

//autalizacao de informacoes do usuario pelo mesmo
router.patch('/', verifyToken, UpdateUser.updateUserInfo)

module.exports = router