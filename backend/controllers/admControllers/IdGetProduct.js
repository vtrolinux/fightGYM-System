const Product = require('../../models/product')

module.exports = class IdGetProduct {
    static async getProductById(req, res){
        
        const prodId = req.params.id

        try {
            const prodInfo = await Product.findOne({_id: prodId})
            return res.json({error: null, data: prodInfo})
    
        }catch(err){
            return res.status(400).json({error: 'Falha ao buscar informações de produto'})
        }
    }
}