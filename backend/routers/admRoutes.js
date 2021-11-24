const router = require('express').Router()
const verifyToken = require('../middleware/check-token')
const verifyFieldADM = require('../middleware/verifyFieldADM')

//define file storage
const multer = require('multer')
const diskStorage = require('../helpers/file-storage')
const upload = multer({storage: diskStorage})
const admController = require('../controllers/AdmController')

//registro de produto por adm
router.post('/products/', verifyToken, verifyFieldADM,upload.fields([{name: "photos"}]), admController.registerProduct)
//retorna os ultimos produtos registrados(Todos os produtos)
router.get('/products/', verifyToken, verifyFieldADM, admController.admGetProducts)
// busca por produto especifico mostrando TODAS as informações do produto para o ADM
router.get('/products/:id',verifyToken, verifyFieldADM, admController.getProductById)
//edição de produto
router.patch('/products/',verifyToken, verifyFieldADM,upload.fields([{name: 'photos'}]), admController.editProduct)
//remoção de produto
router.delete('/products/',verifyToken, verifyFieldADM, admController.removeProduct)

module.exports = router