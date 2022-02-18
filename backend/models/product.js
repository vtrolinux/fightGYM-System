const mongoose = require('../db/mongooseConnection')

const productSchema = new mongoose.Schema({
    nameProduct: {type: String, required: true},
    categoryProduct: {type: String},
    descriptionProduct: {type: String},
    priceProduct: {type: Number},
    photosProduct: {type: Array},  
    showShopProduct:{type: Boolean}
})

const Product = mongoose.model('Product', productSchema)

module.exports = Product