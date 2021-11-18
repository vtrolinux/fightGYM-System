const Product = require('../../models/product')

module.exports = class GetProducts {
    static async admGetProducts(req, res) {

        try {
            const productList = await Product.find({}).sort([['_id:',-1]])
            return res.json({error: null, data: productList})
    
        }catch(err){
            return res.status(400).json({error: 'Falha ao buscar pro produtos.'})
        }
        
    }
}