//modules
const express = require('express')
const Bodyparser = require('body-parser') 
const cors = require('cors') 
const mongoose = require('mongoose')
//const credentials = require('./credentials.json')
//routers import
const authRouter = require('./routers/authRoutes')
const userRouter =  require('./routers/userRoutes')
const admRouter = require('./routers/admRoutes')
//middleware


//config

const port = 3000
const nomeBanco = 'bancoFight'
const app = express()


app.use(cors())
app.use(express.json())
app.use(express.static('public'))
// routers api's
app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)
app.use('/api/administration', admRouter)
//atrelar rotas ao express

app.get('/',(req,res)=>{
    console.log(process.env.SECRET)
    res.json({menssage: 'ok'})
})

app.listen(port,()=>{
    console.log(`SERVIDOR SENDO EXECUTADO NA PORTA ${port}`)
})

//conexao mongodb
mongoose.connect(`mongodb://localhost/${nomeBanco}`, 
{
  useNewUrlParser: true,
 // useFindAndModify: false,
  useUnifiedTopology: true
}) 