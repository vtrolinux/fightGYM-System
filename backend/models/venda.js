const mongoose = require('mongoose')

const vendaSchema = new mongoose.Schema({
    idVenda: {type: Number},
    userId: {type: mongoose.ObjectId},
    produtos: {type: Array},
    notaFiscal: {type: String},
    dataVenda: {type: Date},
    totalVenda: {type: Number}
})

const Venda = mongoose.model('Venda', vendaSchema)

module.exports = Venda