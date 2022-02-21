const validator = require('validator')

const registerProduct = (nameProduct, categoryProduct, priceProduct) => {
    if(!nameProduct){
        throw new Error('O produto deve ter um nome.')
    }
    if(!categoryProduct){
        throw new Error('O produto deve ter uma categoria.')
    }
    if(!priceProduct){
        throw new Error('O produto deve ter um preço.')
    }
}

module.exports = {
    registerProduct
}