const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    idProduct: {type: Number, required: true},
    nameProduct: {type: String, required: true},
    categoryProduct: {type: String},
    descriptionProduct: {type: String},
    priceProduct: {type: Number},
    variations: [{
        color: {type: String},
        size: {type: Number},
        photos: {type: Array},
        priceVar: {type: Number},
        stockNumber: {type: Number}
    }],
    showShop:{type: Boolean}
})
const Product = mongoose.model('Product', productSchema)

module.exports = Product