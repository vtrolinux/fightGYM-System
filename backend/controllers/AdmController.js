const AdmServices = require('../services/AdmServices')
const administrationValidators = require('../validations/administrationValidators')

async function registerProduct(req, res){
    
    const {nameProduct, categoryProduct, descriptionProduct, priceProduct, showShopProduct} = req.body
    const images = req.files
    
    console.log(req.body)
    //input validation
    try {
        administrationValidators.registerProduct(nameProduct, categoryProduct, priceProduct)
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
        administrationValidators.paramIdCheck(prodId)
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

    try{

        const AdmServicesInstance = new AdmServices()
        const {updatedProduct, errorMessage} = await AdmServicesInstance.serviceEditProduct(req)
        if(errorMessage){
            return res.status(400).json({error: errorMessage})
        }

        return res.json({ error: null, msg: "Produto Alterado com Sucesso", data: updatedProduct })

    }catch(err){
        return res.status(400).json({ error: 'Falha na alteração do produto' })
    }
}
async function removeProduct(req, res){
    const prodId = req.body._id
    try{

        const AdmServicesInstance = new AdmServices()
        const {msg, errorMessage} = await AdmServicesInstance.serviceRemoveProduct(prodId)
        if(errorMessage){
            return res.status(400).json({error: errorMessage})
        }

        return res.json({ error: null, msg: msg })

    }catch(err){
        return res.status(400).json({ error: 'Falha na remoção do produto' })
    }

}
module.exports = {
    registerProduct,
    admGetProducts,
    getProductById,
    editProduct,
    removeProduct,
}