const Product = require('../models/product')

module.exports = class AdmServices{
    constructor(){}

    async serviceRegister(req){

        console.log(req.body)
        let files = []
        //verifica se veio arquivos na requisição | *O usuário pode armazenar festas sem fotos
        if (req.files) {
            console.log('tem fotos')
            files = req.files.photos
        }
        //salva os caminhos das fotos do upload no backend
        let photos = []
        if (files && files.length > 0) {

            files.forEach((PHOTO, i) => {
                photos[i] = PHOTO.path
                console.log('path foto: ' + photos[i])
            })

        }
        if (req.body.nameProduct == 'null' || req.body.categoryProduct == 'null' || req.body.descriptionProduct == 'null' || req.body.priceProduct == 'null') {
            return res.status(400).json({ error: 'Preencha os campos' })
        }
        const newProduct = new Product({
            nameProduct: req.body.nameProduct,
            categoryProduct: req.body.categoryProduct,
            descriptionProduct: req.body.descriptionProduct,
            priceProduct: req.body.priceProduct,
            photosProduct: photos,
            showShopProduct: req.body.showShopProduct
            //mais info para adicionar[variacoes de produto]
        })
        try {
            const productSaved = await newProduct.save()
            return { productSaved: productSaved }
        } catch (err) {
            return { error: 'Falha no registro do produto' }
        }
    }
}