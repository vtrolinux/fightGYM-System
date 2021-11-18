const router = require('express').Router()
const CreateUserController = require('../controllers/authControllers/CreateUserController')
const LoginUserController = require('../controllers/authControllers/LoginUserController')

router.post('/register', CreateUserController.register)
router.post('/login', LoginUserController.Login)

module.exports = router