const router = require('express').Router()
const ListProducts = require('../controllers/productController/ListProducts')
const GetProduct = require('../controllers/productController/GetProduct')

//lista todos os produtos
router.get('/', ListProducts.listAllProducts)

//carrega produto especifico
router.get('/:id',GetProduct.getProductById)

module.exports = router

