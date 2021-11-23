const router = require('express').Router()
const verifyToken = require('../middleware/check-token')
const verifyFieldADM = require('../middleware/verifyFieldADM')
const RegisterProduct = require('../controllers/admControllers/RegisterProduct')
const GetProducts = require('../controllers/admControllers/GetProducts')
const IdGetProduct = require('../controllers/admControllers/IdGetProduct')
const EditProduct = require('../controllers/admControllers/EditProduct')
const DeleteProduct = require('../controllers/admControllers/DeleteProduct')
//define file storage
const multer = require('multer')
const diskStorage = require('../helpers/file-storage')
const upload = multer({storage: diskStorage})
const admController = require('../controllers/AdmController')

//registro de produto por adm
router.post('/products/', verifyToken, verifyFieldADM,upload.fields([{name: "photos"}]), RegisterProduct.registerProduct)

//retorna os ultimos produtos registrados(Todos os produtos)
router.get('/products/', verifyToken, verifyFieldADM, GetProducts.admGetProducts)

// busca por produto especifico mostrando TODAS as informações do produto para o ADM
router.get('/products/:id',verifyToken, verifyFieldADM, IdGetProduct.getProductById)

//edição de produto
router.patch('/products/',verifyToken, verifyFieldADM,upload.fields([{name: 'photos'}]), EditProduct.editProduct)

//remoção de produto
router.delete('/products/',verifyToken, verifyFieldADM, DeleteProduct.removeProduct)

//----------------------------------------------------
//registro de produto por adm
router.post('/products2/', verifyToken, verifyFieldADM,upload.fields([{name: "photos"}]), admController.registerProduct)
//edição de produto
router.patch('/products2/',verifyToken, verifyFieldADM,upload.fields([{name: 'photos'}]), admController.editProduct)
//retorna os ultimos produtos registrados(Todos os produtos)
router.get('/products2/', verifyToken, verifyFieldADM, admController.admGetProducts)
// busca por produto especifico mostrando TODAS as informações do produto para o ADM
router.get('/products2/:id',verifyToken, verifyFieldADM, admController.getProductById)

module.exports = router