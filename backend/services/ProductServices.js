const Product = require('../models/product')

module.exports = class ProductServices{
    constructor(){}

    async serviceListAllProducts(){

        //filtro de categorias?

        try {

            const produtos = await Product.find({ showShopProduct: true }, { showShopProduct: 0 })
            return { produtos }
        
        } catch (err) {
            return { errorMessage: 'falha ao buscar por produtos' }
        }

    }

    async serviceGetProductById(id){

        try {

            const produto = await Product.findOne({ _id: id, showShopProduct: true }, { showShopProduct: 0 })
            console.log(produto)
            if (produto === null) {
                return { errorMessage: 'Produto não disponível' }
            }
            return { produto }

        } catch (err) {

            return { errorMessage: 'falha ao buscar por produto' }

        }

    }
}