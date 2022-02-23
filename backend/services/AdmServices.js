const Product = require('../models/product')

module.exports = class AdmServices {
    constructor() { }

    async serviceRegisterProduct(nameProduct, categoryProduct, descriptionProduct, priceProduct, showShopProduct, images) {
        console.log(images)
        //salva os caminhos das fotos do upload no backend
        let photos = []
        if (images && images.length > 0) {

            images.forEach((PHOTO, i) => {
                photos[i] = PHOTO.filename
                console.log('path foto: ' + photos[i])
            })

        }

        if (!showShopProduct) { showShopProduct = false } //caso no registro do produto nao seja informado

        const newProduct = new Product({
            nameProduct,
            categoryProduct,
            descriptionProduct,
            priceProduct,
            photosProduct: photos,
            showShopProduct
            //mais info para adicionar[variacoes de produto]
        })
        try {
            const productSaved = await newProduct.save()
            return { productSaved }
        } catch (err) {
            throw ({ status: 422, code: 'FAIL_OPERATION', message: 'Ocorreu um erro, talvez o serviço esteja indisponivel, tente mais tarde.' })
        }
    }
    async serviceGetProducts() {
        try {
            const productList = await Product.find({}).sort([['_id:', -1]])
            return { productList }

        } catch (err) {
            throw ({ status: 422, code: 'FAIL_OPERATION', message: 'Falha ao localizar produtos.' })
        }
    }
    async serviceGetPruductId(prodId) {

        try {
            const prodInfo = await Product.findOne({ _id: prodId })
            return { prodInfo }

        } catch (err) {
            throw ({ status: 422, code: 'FAIL_OPERATION', message: 'Falha ao localizar produto.' })
        }
    }
    async serviceEditProduct(_id, nameProduct, categoryProduct, descriptionProduct, priceProduct, images) {

        const editProd = {
            _id,
            nameProduct,
            categoryProduct,
            descriptionProduct,
            priceProduct,
        }
        // create photos array with path
        let photos = [];

        if (images && images.length > 0) {

            images.forEach((photo, i) => {
                photos[i] = photo.path;
            });

            editProd.photosProduct = photos;

        }
        try {
            // returns updated data
            const updatedProduct = await Product.findOneAndUpdate({ _id: editProd._id }, { $set: editProd }, { new: true });
            return { updatedProduct }

        } catch (err) {
            throw ({ status: 422, code: 'FAIL_OPERATION', message: 'Falha ao alterar produto' })
        }
    }
    async serviceRemoveProduct(prodId) {

        console.log('id delete product: ' + prodId)

        try {
            const prod = await Product.findOne({ _id: prodId })
            if (!prod) {
                throw ({ status: 422, code: 'FAIL_OPERATION', message: 'Esse Produto não existe' })
            }
            await Product.deleteOne({ _id: prodId })
            
        } catch (err) {
            throw ({ status: 422, code: 'FAIL_OPERATION', message: 'Falha ao remover produto' })
        }

    }
}