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
async function admGetProducts(req, res){

    try{
        const AdmServicesInstance = new AdmServices()
        const {productList, errorMessage} = await AdmServicesInstance.serviceGetProducts()
        if(errorMessage){
            return res.status(400).json({error: errorMessage})
        }
        return res.json({error: null, data: productList})
    }catch(err){
        return res.status(400).json({error: 'Falha ao buscar pro produtos.'})
    }

}
async function getProductById(req, res){
    const prodId = req.params.id
    try{
        const AdmServicesInstance = new AdmServices()
        const {prodInfo, errorMessage} = await AdmServicesInstance.serviceGetPruductId(prodId)
        if(errorMessage){
            return res.status(400).json({error: errorMessage})
        }
        return res.json({error: null, data: prodInfo})
    }catch(err){
        return res.status(400).json({error: 'Falha ao buscar pelo produto.'})
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