const ProductServices = require('../services/ProductServices')

async function listAllProducts(req, res){

    try{

        const ProductServicesInstance = new ProductServices()
        const {produtos, errorMessage} = await ProductServicesInstance.serviceListAllProducts()
        if(errorMessage){
            return res.json({ error: errorMessage })
        }
        return res.json({ error: null, data: produtos })
 
    }catch(err){
        return res.status(400).json({ error: 'falha ao buscar por produto' })
    }

}
async function getProductById(req, res){

    const id = req.params.id

    try{
        const ProductServicesInstance = new ProductServices()
        const {produto, errorMessage} = await ProductServicesInstance.serviceGetProductById(id)
        if(errorMessage){
            return res.json({ error: errorMessage })
        }
        return res.json({ error: null, data: produto })
    }catch(err){
        return res.status(400).json({ error: 'falha ao buscar por produto' })
    }

}

module.exports = {
    listAllProducts,
    getProductById
}