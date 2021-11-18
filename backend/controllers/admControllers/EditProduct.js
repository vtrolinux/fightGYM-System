const Product = require('../../models/product')

module.exports = class EditProduct {
    
    static async editProduct(req, res){

    console.log('patch adm: '+req.body.idProduct)
    if(req.body.idProduct =='null' || req.body.nameProduct=='null' || req.body.categoryProduct=='null'|| req.body.descriptionProduct=='null'|| req.body.priceProduct=='null'){
        return res.status(400).json({error: 'Preencha os campos'})
    }
    const editProd = {
        idProduct : req.body.idProduct,
        nameProduct: req.body.nameProduct,
        categoryProduct: req.body.categoryProduct,
        descriptionProduct: req.body.descriptionProduct,
        priceProduct: req.body.priceProduct,
        variationsProduct: [],
    }
    try {      

        // returns updated data
        const updatedProduct = await Product.findOneAndUpdate({ idProduct: editProd.idProduct}, { $set: editProd }, {new: true});
        return res.json({ error: null, msg: "Produto atualizado com sucesso!", data: updatedProduct });
    
      } catch (err) {
    
        return res.status(400).json({ error: 'Falha ao alterar produto' })
          
      }
    }
}

