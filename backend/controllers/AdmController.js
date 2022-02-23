const AdmServices = require('../services/AdmServices')
const administrationValidators = require('../validations/administrationValidators')
const inputValidators = require('../validations/inputValidators')

async function registerProduct(req, res){
    
    const {nameProduct, categoryProduct, descriptionProduct, priceProduct, showShopProduct} = req.body
    const images = req.files
    
    console.log(req.body)
    //input validation
    try {
        administrationValidators.registerValidator(nameProduct, categoryProduct, priceProduct)
    } catch (err) {
        return res.status(422).json({ error: err.message })
    }
    //call service
    try{

        const AdmServicesInstance = new AdmServices()
        const {productSaved} = await AdmServicesInstance.serviceRegisterProduct(nameProduct, categoryProduct, descriptionProduct, priceProduct, showShopProduct, images)
        return res.json({ error: null, message: "Produto Cadastrado com Sucesso", data: productSaved })

    }catch(err){
        if(!err.status){
            return res.status(500).json( { error: { code: 'UNKNOWN_ERROR', message: 'An unknown error occurred.' } })
        }
        return res.status(err.status).json( { error: { code: err.code, message: err.message } })
    }

}
async function admGetProducts(req, res){

    try{
        const AdmServicesInstance = new AdmServices()
        const {productList} = await AdmServicesInstance.serviceGetProducts()

        return res.json({error: null, data: productList})
    }catch(err){
        if(!err.status){
            return res.status(500).json( { error: { code: 'UNKNOWN_ERROR', message: 'An unknown error occurred.' } })
        }
        return res.status(err.status).json( { error: { code: err.code, message: err.message } })
    }

}
async function getProductById(req, res){
    const prodId = req.params.id
    //input validation
    try {
        inputValidators.paramIdValidator(prodId)
    } catch (err) {
        return res.status(422).json({ error: err.message })
    }

    try{
        const AdmServicesInstance = new AdmServices()
        const {prodInfo} = await AdmServicesInstance.serviceGetPruductId(prodId)

        return res.json({error: null, prod: prodInfo})
    }catch(err){
        if(!err.status){
            return res.status(500).json( { error: { code: 'UNKNOWN_ERROR', message: 'An unknown error occurred.' } })
        }
        return res.status(err.status).json( { error: { code: err.code, message: err.message } })
    }

}
async function editProduct(req, res){

    const { _id, nameProduct, categoryProduct, descriptionProduct, priceProduct} = req.body
    const images = req.files

    try {
        inputValidators.mongoIdValidator(_id)
    } catch (err) {
        return res.status(422).json({ error: err.message })
    }

    try{

        const AdmServicesInstance = new AdmServices()
        const {updatedProduct} = await AdmServicesInstance.serviceEditProduct(_id, nameProduct, categoryProduct, descriptionProduct, priceProduct, images)

        return res.json({ error: null, message: "Produto Alterado com Sucesso", prod: updatedProduct })

    }catch(err){
        if(!err.status){
            return res.status(500).json( { error: { code: 'UNKNOWN_ERROR', message: 'An unknown error occurred.' } })
        }
        return res.status(err.status).json( { error: { code: err.code, message: err.message } })
    }
}
async function removeProduct(req, res){
    const prodId = req.body._id

    try {
        inputValidators.mongoIdValidator(prodId)
    } catch (err) {
        return res.status(422).json({ error: err.message })
    }

    try{

        const AdmServicesInstance = new AdmServices()
        await AdmServicesInstance.serviceRemoveProduct(prodId)

        return res.json({ error: null, message: 'Produto removido com sucesso' })

    }catch(err){
        if(!err.status){
            return res.status(500).json( { error: { code: 'UNKNOWN_ERROR', message: 'An unknown error occurred.' } })
        }
        return res.status(err.status).json( { error: { code: err.code, message: err.message } })
    }

}
module.exports = {
    registerProduct,
    admGetProducts,
    getProductById,
    editProduct,
    removeProduct,
}