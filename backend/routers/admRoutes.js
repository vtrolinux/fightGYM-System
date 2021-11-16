const router = require('express').Router()
const credentials = require('../credentials.json')
const verifyToken = require('../helpers/check-token')
const verifyFieldADM = require('../helpers/verifyFieldADM')
const Product = require('../models/product')
//helpers
const getUserByToken = require('../helpers/get-user-by-token')

//registro de produto por adm
router.post('/products/', verifyToken, verifyFieldADM, async (req, res) => {
    console.log(req.body)


    if (req.body.idProduct == 'null' || req.body.nameProduct == 'null' || req.body.categoryProduct == 'null' || req.body.descriptionProduct == 'null' || req.body.priceProduct == 'null') {
        return res.status(400).json({ error: 'Preencha os campos' })
    }
    const newProduct = new Product({
        idProduct: req.body.idProduct,
        nameProduct: req.body.nameProduct,
        categoryProduct: req.body.categoryProduct,
        descriptionProduct: req.body.descriptionProduct,
        priceProduct: req.body.priceProduct,
        //mais info para adicionar[variacoes de produto]
    })
    try {
        const productSaved = await newProduct.save()
        return res.json({ error: null, msg: "Produto registrado com sucesso", data: productSaved })
    } catch (err) {
        return res.status(400).json({ error: 'Falha no registro do produto' })
    }

})
//retorna os ultimos produtos registrados
router.get('/products/', verifyToken, verifyFieldADM, async(req,res) => {

    try {
        const productList = await Product.find({}).sort([['_id:',-1]])
        return res.json({error: null, data: productList})

    }catch(err){
        return res.status(400).json({error: 'Falha ao buscar pro produtos.'})
    }

})
// busca por produto especifico mostrando TODAS as informações do produto para o ADM
router.get('/products/:id',verifyToken, verifyFieldADM, async(req, res) => {

    const prodId = req.params.id

    try {
        const prodInfo = await Product.findOne({_id: prodId})
        return res.json({error: null, data: prodInfo})

    }catch(err){
        return res.status(400).json({error: 'Falha ao buscar informações de produto'})
    }

})
router.patch('/products/edit',verifyToken, verifyFieldADM, async(req, res) => {
    console.log('patch adm: '+req.body)
    const editProd = {
        
    }
})
module.exports = router