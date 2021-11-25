const router = require('express').Router()
const ProductController = require('../controllers/ProductController')

//lista todos os produtos
router.get('/', ProductController.listAllProducts)

//carrega produto especifico
router.get('/:id', ProductController.getProductById)

module.exports = router

