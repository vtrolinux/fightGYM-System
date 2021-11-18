const Product = require('../../models/product')

module.exports = class ListProducts {
    static async listAllProducts(req, res) {

        //filtro de categorias?

        try {

            const produtos = await Product.find({ showShopProduct: true }, { showShopProduct: 0 })
            return res.json({ error: null, produtos: produtos })

        } catch (err) {
            return res.status(400).json({ error: 'falha ao buscar por produtos' })
        }
    }
}