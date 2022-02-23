const validator = require('validator')

const paramIdValidator = (prodId) => {
    //estrutura de 24 bytes de _id do mongo
    if(prodId.length != 24){
        throw new Error('ID nao informado ou invalido.')
    }
}

const mongoIdValidator = (bodyId) => {
    if(bodyId.length != 24){
        throw new Error('ID nao informado ou invalido.')
    }
}

module.exports = {
    paramIdValidator,
    mongoIdValidator
}