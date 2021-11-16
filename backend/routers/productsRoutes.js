const Product = require('../models/product')
const router = require('express').Router()

//lista todos os produtos
router.get('/', async(req, res) => {

    //filtro de categorias?

    try{

        const produtos = await Product.find({showShopProduct: true},{showShopProduct:0})
        return res.json({error: null, produtos: produtos })

    }catch(err){
        return res.status(400).json({error: 'falha ao buscar por produtos'})
    }
})

//carrega produto especifico
router.get('/:id', async(req, res) => {
    const id = req.params.id

    try{

        const produto = await Product.findOne({_id: id, showShopProduct: true},{showShopProduct:0})
        console.log(produto)
        if(produto === null){
            return res.json({error: 'Produto não disponível'})
        }
        return res.json({error: null, produto: produto})

    }catch(err){

        return res.status(400).json({error: 'falha ao buscar por produto'})

    }
})
module.exports = router

