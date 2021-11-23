const Product = require('../models/product')

module.exports = class AdmServices{
    constructor(){}

    async serviceRegisterProduct(req){

        console.log(req.body)
        let files = []
        //verifica se veio arquivos na requisição | *O usuário pode armazenar festas sem fotos
        if (req.files) {
            console.log('tem fotos')
            files = req.files.photos
        }
        //salva os caminhos das fotos do upload no backend
        let photos = []
        if (files && files.length > 0) {

            files.forEach((PHOTO, i) => {
                photos[i] = PHOTO.path
                console.log('path foto: ' + photos[i])
            })

        }
        if (req.body.nameProduct === 'null' || req.body.categoryProduct === 'null' || req.body.descriptionProduct === 'null' || req.body.priceProduct === 'null') {
            return { errorMessage: 'Preencha os campos' }
        }
        const newProduct = new Product({
            nameProduct: req.body.nameProduct,
            categoryProduct: req.body.categoryProduct,
            descriptionProduct: req.body.descriptionProduct,
            priceProduct: req.body.priceProduct,
            photosProduct: photos,
            showShopProduct: req.body.showShopProduct
            //mais info para adicionar[variacoes de produto]
        })
        try {
            const productSaved = await newProduct.save()
            return { productSaved: productSaved }
        } catch (err) {
            return { errorMessage: 'Falha no registro do produto' }
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
          return { updatedProduct: updatedProduct }
     
        } catch (err) {
      
          return { errorMessage: 'Falha ao alterar produto' }
            
        }
    }
}