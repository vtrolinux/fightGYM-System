const Product = require('../../models/product')

module.exports = class DeleteProduct {
    
    static async removeProduct(req, res) {

        const prodId = req.body.productId
        console.log('id delete: ' + prodId)

        try {
            await Product.deleteOne({ idProduct: prodId })
            return res.json({ error: null, msg: 'Produto deletado com sucesso.' })
        } catch (err) {
            return res.status(400).json({ error: 'Falha ao deletar produto' })
        }

    }
}