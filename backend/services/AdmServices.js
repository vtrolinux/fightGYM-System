const Product = require('../models/product')

module.exports = class AdmServices{
    constructor(){}

    async serviceRegisterProduct(nameProduct, categoryProduct, descriptionProduct, priceProduct, showShopProduct, images){
        console.log(images)
        //salva os caminhos das fotos do upload no backend
        let photos = []
        if (images && images.length > 0) {

            images.forEach((PHOTO, i) => {
                photos[i] = PHOTO.filename
                console.log('path foto: ' + photos[i])
            })

        }

        if(!showShopProduct){ showShopProduct = false } //caso no registro do produto nao seja informado

        const newProduct = new Product({
            nameProduct,
            categoryProduct,
            descriptionProduct,
            priceProduct,
            photosProduct: photos,
            showShopProduct
            //mais info para adicionar[variacoes de produto]
        })
        try {
            const productSaved = await newProduct.save()
            return { productSaved }
        } catch (err) {
            throw ({ status: 422, code: 'FAIL_OPERATION', message: 'Ocorreu um erro, talvez o serviço esteja indisponivel, tente mais tarde.' })
        }
    }
    async serviceGetProducts(){
        try {
            const productList = await Product.find({}).sort([['_id:',-1]])
            return {productList}
    
        }catch(err){
            throw ({ status: 422, code: 'FAIL_OPERATION', message: 'Falha ao localizar pro produtos.' })
        }
    }
    async serviceGetPruductId(prodId){

        try {
            const prodInfo = await Product.findOne({_id: prodId})
            return { prodInfo }
    
        }catch(err){
            return {errorMessage: 'Falha ao buscar informações de produto'}
        }
    }
    async serviceEditProduct(req){

        let files = []
        //verifica se veio arquivos na requisição | *O usuário pode armazenar festas sem fotos
        if(req.files){
            files = req.files.photos
        }
  
      console.log('patch adm: '+req.body._id)
      if(req.body._id ==='null' || req.body.nameProduct==='null' || req.body.categoryProduct==='null'|| req.body.descriptionProduct==='null'|| req.body.priceProduct==='null'){
          return {errorMessage: 'Preencha os campos'}
      }
      const editProd = {
          _id: req.body._id,
          nameProduct: req.body.nameProduct,
          categoryProduct: req.body.categoryProduct,
          descriptionProduct: req.body.descriptionProduct,
          priceProduct: req.body.priceProduct,      
      }
      // create photos array with path
      let photos = [];
  
      if(files && files.length > 0) {    
  
          files.forEach((photo, i) => {
          photos[i] = photo.path;
          });
  
          editProd.photosProduct = photos;
  
      }
      try {      
          // returns updated data
          const updatedProduct = await Product.findOneAndUpdate({ _id: editProd._id}, { $set: editProd }, {new: true});
          return { updatedProduct }
     
        } catch (err) {
      
          return { errorMessage: 'Falha ao alterar produto' }
            
        }
    }
    async serviceRemoveProduct(prodId){
        
        console.log('id delete service: ' + prodId)

        try {
            const prod = await Product.findOne({ _id: prodId })
            if(!prod){
                return { errorMessage: 'Esse Produto não existe' }
            }
            await Product.deleteOne({ _id: prodId })
            return { msg: 'Produto deletado com sucesso.' }
        } catch (err) {
            return { errorMessage: 'Falha ao deletar produto' }
        }

    }
}