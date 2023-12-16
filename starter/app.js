//import .env
require('dotenv').config()//config only sets the variables in .env file to process.env

//inbuilt express error management
require('express-async-errors')//we use this so that we dont need to use try catch in every controller founction

//import express
const express=require('express')
const app=express()

//rest of packages
const morgan=require('morgan')//middleware
const cookieParser=require('cookie-parser')
const fileUpload=require('express-fileupload')
const rateLimiter=require('express-rate-limit')
const helmet=require('helmet')
const xss=require('xss-clean')
const cors=require('cors')
const mongoSatinize=require('express-mongo-sanitize')

//connect app to db
const connectDB=require('./db/connect')


//importing routes
const authRouter=require('./routes/authRoutes')
const userRouter=require('./routes/userRoutes')
const productRouter=require('./routes/productRoutes')
const reviewRouter=require('./routes/reviewRoutes')
const orderRouter=require('./routes/orderRoutes')

//import middlewares
const notFoundMiddleware=require('./middleware/not-found')
const errorHandlerMiddleware=require('./middleware/error-handler')
const { authenticateUser } = require('./middleware/authentication')



//defining port
const port=process.env.PORT || 3000


//security
app.set('trust proxy',1)
app.use(rateLimiter({//ratelimiter should always set after trust proxy
    windowMs:15*60*1000,
    max:60
}))
app.use(helmet())
app.use(cors())
app.use(xss())
app.use(mongoSatinize())

//required middlewares
app.use(morgan('tiny'))//this time refers to the amount of info u need 
app.use(express.json())
app.use(cookieParser(process.env.JWT_SECRET))//to access the cookies  we use the same jwt secret to sign the cookies for now to be more secure use diff string
app.use(express.static('./public'))//to upload images
app.use(fileUpload())


app.get('/',(req,res)=>{
    res.send("ecommerce")
})

//for testing
app.get('/api/v1',(req,res)=>{
    console.log(req.signedCookies)
    res.send('testing')
})


app.use('/api/v1/auth',authRouter)
app.use('/api/v1/users',userRouter)
app.use('/api/v1/products',productRouter)
app.use('/api/v1/reviews',reviewRouter)
app.use('/api/v1/orders',authenticateUser,orderRouter)

//applying middlewares
app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)//this should always come affter notfound error



const start=async()=>{
    try{
        await connectDB(process.env.MONGO_URI)
        app.listen(port,()=>{
            console.log(`server is listening in ${port}....`)
        })
    }
    catch(err){
        console.log(err)
    }
}


start();