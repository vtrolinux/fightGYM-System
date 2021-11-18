const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    idProduct: {type: Number},
    nameProduct: {type: String, required: true},
    categoryProduct: {type: String},
    descriptionProduct: {type: String},
    priceProduct: {type: Number},
    variationsProduct: [{
        color: {type: String},
        size: {type: Number},
        photos: {type: Array},
        priceVar: {type: Number},
        stockNumber: {type: Number}
    }],
    showShopProduct:{type: Boolean}
})

const Product = mongoose.model('Product', productSchema)

module.exports = Product