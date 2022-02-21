const router = require('express').Router()
const verifyToken = require('../middleware/check-token')
const verifyFieldADM = require('../middleware/verifyFieldADM')

//helpers
const {imageUpload} = require('../helpers/file-storage')
const admController = require('../controllers/AdmController')

//registro de produto por adm
router.post('/products/', verifyToken, verifyFieldADM, imageUpload.array('photos'), admController.registerProduct)
//retorna os ultimos produtos registrados(Todos os produtos)
router.get('/products/', verifyToken, verifyFieldADM, admController.admGetProducts)
// busca por produto especifico mostrando TODAS as informações do produto para o ADM
router.get('/products/:id',verifyToken, verifyFieldADM, admController.getProductById)
//edição de produto
router.patch('/products/',verifyToken, verifyFieldADM, imageUpload.array('photos'), admController.editProduct)
//remoção de produto
router.delete('/products/',verifyToken, verifyFieldADM, admController.removeProduct)

module.exports = router