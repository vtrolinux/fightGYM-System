const Product = require('../models/product')
const redisDB = require('../db/ioRedis')

module.exports = class ProductServices{
    constructor(){}

    async serviceListAllProducts(){    
        
        try {

            const redisCacheProducts = await redisDB.get("products")
            
            if(redisCacheProducts != 'Error' && redisCacheProducts){
                console.log('cache')
                const produtos = JSON.parse(redisCacheProducts)
  
                return { produtos }
            }

            const produtos = await Product.find({ showShopProduct: true }, { showShopProduct: 0 }) 

            await redisDB.set("products",JSON.stringify(produtos)) 
            console.log('banco')
            return { produtos }
        
        } catch (err) {
            throw ({ status: 422, code: 'FAIL_OPERATION', message: 'falha ao buscar por produtos' })
        }        

    }

    async serviceGetProductById(id){

        try {

            const produto = await Product.findOne({ _id: id, showShopProduct: true }, { showShopProduct: 0 })
            console.log(produto)
            if (produto === null) {
                throw ({ status: 422, code: 'FAIL_OPERATION', message: 'Produto não disponível' })
            }
            return { produto }

        } catch (err) {
            throw ({ status: 422, code: 'FAIL_OPERATION', message: 'falha ao buscar po produto' })
        }

    }
    
}