const mongoose = require('../db/mongooseConnection')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 35
    },
    email: {
        type: String,
        required:true,
        unique: true,
        lowercase: true,
        trim: true,
        match: [
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please add a valid email address.',]
    },
    password: {type: String, required:true},
    dataReg: {type: Date},
    photoProfile: {type: String},
    twoFactorsEnable: {type: Boolean},
    contaDesativada: {type: Boolean}
})

const User = mongoose.model('User', userSchema)

module.exports = User