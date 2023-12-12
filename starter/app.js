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

//connect app to db
const connectDB=require('./db/connect')


//importing routes
const authRouter=require('./routes/authRoutes')
const userRouter=require('./routes/userRoutes')
const productRouter=require('./routes/productRoutes')
const reviewRouter=require('./routes/reviewRoutes')

//import middlewares
const notFoundMiddleware=require('./middleware/not-found')
const errorHandlerMiddleware=require('./middleware/error-handler')



//defining port
const port=process.env.PORT || 3000

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