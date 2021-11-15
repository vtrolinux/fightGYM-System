const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    idProduto: {type: Number, required: true},
    name: {type: String, required: true},
    category: {type: String},
    description: {type: String},
    variations: [{
        color: {type: String},
        size: {type: Number},
        photos: {type: Array},
        price: {type: Number},
        stockNumber: {type: Number}
    }],
    showShop:{type: Boolean}
})
const Product = mongoose.model('Product', productSchema)

module.exports = Product