const multer = require('multer')
const path = require('path')

const imageStorage = multer.diskStorage({
    destination: function(req, file, cb){
        let folder = ''
        //console.log(req.baseUrl)
        if(req.baseUrl.includes('user')){
            folder = 'users'
        }else if(req.baseUrl.includes('administration')){
            folder = 'products'

        }
        cb(null, `public/img/${folder}`)
    },
    filename: function(req, file, cb){
        cb(null, Date.now() + String(Math.floor(Math.random() * 1000))+ path.extname(file.originalname))
    }
})

const imageUpload = multer({
    storage: imageStorage,
    fileFilter(req, file, cb){
        if(!file.originalname.match(/\.(png|jpg)$/)){
            return cb(new Error('Por favor, envie apenas png ou jpg!'))
        }
        cb(undefined, true)
    }
})

module.exports = {imageUpload}