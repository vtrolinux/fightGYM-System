const Product = require('../../models/product')

module.exports = class EditProduct {
    
    static async editProduct(req, res){

      let files = []
      //verifica se veio arquivos na requisição | *O usuário pode armazenar festas sem fotos
      if(req.files){
          files = req.files.photos
      }

    console.log('patch adm: '+req.body._id)
    if(req.body._id =='null' || req.body.nameProduct=='null' || req.body.categoryProduct=='null'|| req.body.descriptionProduct=='null'|| req.body.priceProduct=='null'){
        return res.status(400).json({error: 'Preencha os campos'})
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
        return res.json({ error: null, msg: "Produto atualizado com sucesso!", data: updatedProduct });
    
      } catch (err) {
    
        return res.status(400).json({ error: 'Falha ao alterar produto' })
          
      }
    }
}

