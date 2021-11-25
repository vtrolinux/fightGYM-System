const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {type: String},
    email: {type: String, required:true},
    password: {type: String, required:true},
    dataReg: {type: Date},
    photoProfile: {type: String},
    twoFactorsEnable: {type: Boolean},
    contaDesativada: {type: Boolean}
})

const User = mongoose.model('User', userSchema)

module.exports = User