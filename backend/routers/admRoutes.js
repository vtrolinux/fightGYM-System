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

//registro de produto por adm
router.post('/products/', verifyToken, verifyFieldADM,upload.fields([{name: "photos"}]), RegisterProduct.registerProduct)

//retorna os ultimos produtos registrados(Todos os produtos)
router.get('/products/', verifyToken, verifyFieldADM, GetProducts.admGetProducts)

// busca por produto especifico mostrando TODAS as informações do produto para o ADM
router.get('/products/:id',verifyToken, verifyFieldADM, IdGetProduct.getProductById)

//edição de produto
router.patch('/products/',verifyToken, verifyFieldADM, EditProduct.editProduct)

//remoção de produto
router.delete('/products/',verifyToken, verifyFieldADM, DeleteProduct.removeProduct)

module.exports = router