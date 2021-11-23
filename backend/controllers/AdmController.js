require('dotenv').config()
const AdmServices = require('../services/AdmServices')

async function registerProduct(req, res){

    try{

        const AdmServicesInstance = new AdmServices()
        const {productSaved, errorMessage} = await AdmServicesInstance.serviceRegisterProduct(req)
        if(errorMessage){
            return res.status(400).json({error: errorMessage})
        }

        return res.json({ error: null, msg: "Produto Cadastrado com Sucesso", data: productSaved })

    }catch(err){
        return res.status(400).json({ error: 'Falha no registro do produto' })
    }

}
async function admGetProducts(){

}
async function getProductById(){

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
async function removeProduct(){

}
module.exports = {
    registerProduct,
    admGetProducts,
    getProductById,
    editProduct,
    removeProduct,
}