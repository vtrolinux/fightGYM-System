const Product = require('../models/product')
const redisDB = require('../configurations/redis')

module.exports = class ProductServices{
    constructor(){}

    async serviceListAllProducts(){    
        
        try {
            
            const redisCacheProducts = await redisDB.get('products')
            
            if(redisCacheProducts != 'Error' && redisCacheProducts){
                
                const produtos = JSON.parse(redisCacheProducts)
                
                return { produtos }
            }
            
            const produtos = await Product.find({ showShopProduct: true }, { showShopProduct: 0 }) 

            redisDB.set('products',JSON.stringify(produtos)) 
          
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