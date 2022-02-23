const ProductServices = require('../services/ProductServices')
const inputValidators = require('../validations/inputValidators')

async function listAllProducts(req, res){

    try{

        const ProductServicesInstance = new ProductServices()
        const {produtos} = await ProductServicesInstance.serviceListAllProducts()

        return res.json({ error: null, data: produtos })
 
    }catch(err){
        if(!err.status){
            return res.status(500).json( { error: { code: 'UNKNOWN_ERROR', message: 'An unknown error occurred.' } })
        }
        return res.status(err.status).json( { error: { code: err.code, message: err.message } })
    }

}
async function getProductById(req, res){

    const id = req.params.id

    try {
        inputValidators.paramIdValidator(id)
    } catch (err) {
        return res.status(422).json({ error: err.message })
    }
    try{
        const ProductServicesInstance = new ProductServices()
        const {produto} = await ProductServicesInstance.serviceGetProductById(id)

        return res.json({ error: null, data: produto })
    }catch(err){
        if(!err.status){
            return res.status(500).json( { error: { code: 'UNKNOWN_ERROR', message: 'An unknown error occurred.' } })
        }
        return res.status(err.status).json( { error: { code: err.code, message: err.message } })
    }

}

module.exports = {
    listAllProducts,
    getProductById
}