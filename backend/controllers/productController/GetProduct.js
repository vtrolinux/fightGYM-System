const Product = require('../../models/product')

module.exports = class GetProduct {
    
    static async getProductById(req, res) {

        const id = req.params.id

        try {

            const produto = await Product.findOne({ _id: id, showShopProduct: true }, { showShopProduct: 0 })
            console.log(produto)
            if (produto === null) {
                return res.json({ error: 'Produto não disponível' })
            }
            return res.json({ error: null, produto: produto })

        } catch (err) {

            return res.status(400).json({ error: 'falha ao buscar por produto' })

        }
    }
}