//modules
const express = require('express')
const Bodyparser = require('body-parser') 
const cors = require('cors') 
//routers import
const authRouter = require('./routers/authRoutes')
const userRouter = require('./routers/userRoutes')
const admRouter = require('./routers/admRoutes')
const productRouter = require('./routers/productsRoutes')
//middleware


//config
require('dotenv').config()
const port = process.env.EXPRESS_PORT
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static('public'))
// routers api's
app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)
app.use('/api/administration', admRouter)
app.use('/api/products', productRouter)
//atrelar rotas ao express

app.get('/',async (req,res)=>{
    
    //await setRedis('chave', 'valor')
    res.json({message: 'okf'})
})

app.listen(port,()=>{
    console.log(`SERVIDOR SENDO EXECUTADO NA PORTA ${port}`)
})


