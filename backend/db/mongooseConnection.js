const mongoose = require('mongoose')
require('dotenv').config()

async function main(){

    const uri = `mongodb://${process.env.MONGO_DB_ADDRESS}:${process.env.MONGO_DB_PORT}/${process.env.MONGO_DB_NAME}`
    const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    family: 4 // Use IPv4, skip trying IPv6
    //serverSelectionTimeoutMS: 5000,
    //autoIndex: false, // Don't build indexes
    //maxPoolSize: 10, // Maintain up to 10 socket connections
    //serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
    //socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity  
    }

    await mongoose.connect(uri, options)
    console.log('mongoose conectado!')
}
main().catch((err) => {console.log('erro ao conectar no banco: '+ err)})

module.exports = mongoose