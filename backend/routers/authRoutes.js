const router = require('express').Router()
const AuthController = require('../controllers/authControllers/AuthController')

router.post('/register', AuthController.register)
router.post('/login', AuthController.Login)

module.exports = router