const Product = require('../../models/product')

module.exports = class RegisterProduct {
    
    static async registerProduct(req, res) {

        console.log(req.body)

        if (req.body.idProduct == 'null' || req.body.nameProduct == 'null' || req.body.categoryProduct == 'null' || req.body.descriptionProduct == 'null' || req.body.priceProduct == 'null') {
            return res.status(400).json({ error: 'Preencha os campos' })
        }
        const newProduct = new Product({
            nameProduct: req.body.nameProduct,
            categoryProduct: req.body.categoryProduct,
            descriptionProduct: req.body.descriptionProduct,
            priceProduct: req.body.priceProduct,
            showShopProduct: req.body.showShopProduct
            //mais info para adicionar[variacoes de produto]
        })
        try {
            const productSaved = await newProduct.save()
            return res.json({ error: null, msg: "Produto registrado com sucesso", data: productSaved })
        } catch (err) {
            return res.status(400).json({ error: 'Falha no registro do produto' })
        }

    }
}