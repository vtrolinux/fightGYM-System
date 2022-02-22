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

const paramIdCheck = (prodId) => {
    //estrutura de 24 bytes de _id do mongo
    if(prodId.length != 24){
        throw new Error('ID nao informado ou invalido.')
    }
}

module.exports = {
    registerProduct,
    paramIdCheck
}