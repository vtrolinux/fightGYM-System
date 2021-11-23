const router = require('express').Router()
const CreateUserController = require('../controllers/authControllers/CreateUserController')
const LoginUserController = require('../controllers/authControllers/LoginUserController')

const AuthController = require('../controllers/AuthController')

router.post('/register', CreateUserController.register)
router.post('/login', LoginUserController.Login)

router.post('/login2', AuthController.Login)

module.exports = router