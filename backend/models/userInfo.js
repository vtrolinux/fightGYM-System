const mongoose = require('../db/mongooseConnection')

const userInfo = new mongoose.Schema({
    userId: {type: mongoose.ObjectId},
    userPhoto: {type: String},
    userAdress: {type: String},
    userComplement: {type: String},
    userCity: {type: String}, 
    userTraningReg: {type: Array}
})
const UserInfo = mongoose.model('UserInfo', userInfo)

module.exports = UserInfo