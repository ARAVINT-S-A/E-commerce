const CustomError=require('../errors/index')
const {StatusCodes}=require('http-status-codes')
const Orders=require('../models/order')
const Product=require('../models/products')
const {checkPermissions}=require('../utils/index')
const order = require('../models/order')

const fakeStripeAPI=async ({amount,currency})=>{
    const client_secret='someRondomValue'
    return {client_secret}
}

const getAllOrders=async(req,res)=>{
    const orders=await Orders.find({})
    res.status(StatusCodes.OK).json({orders})
}

const getSingleOrder=async (req,res)=>{
    const{id:orderId}=req.params
    const order=await Orders.findOne({_id:orderId})
    if(!order){
        throw new CustomError.NotFoundError('no order with id')
    }
    checkPermissions({requestUser:req.user,resourceUserId:order.user})
    res.status(StatusCodes.OK).json({order})
}

const getCurrentUserOrders=async (req,res)=>{
    const orders=await Orders.find({user:req.user.userId})
    res.status(StatusCodes.OK).json({orders})
}

const createOrder=async (req,res)=>{
    const {items:orderItems,tax,shippingFee}=req.body

    if(!orderItems || orderItems.length<1){
        throw new CustomError.BadRequestError('no items in cart')
    }

    if(!tax || !shippingFee){
        throw new CustomError.BadRequestError('no taax or shipping fee')
    }
    let Items=[]
    let subTotal=0
    for(const item of orderItems){
        const dbProduct=await Product.findOne({_id:item.product})
        if(!dbProduct){
            throw new CustomError.NotFoundError('no product found')
        }
    const {name,price,image,_id}=dbProduct
    const singleOrderItem={
        amount:item.amount,
        name,price,image,product:_id
    }
    Items=[...Items,singleOrderItem]//we add each item 
    subTotal+=item.amount*price
}
// console.log(Items)
// console.log(subTotal)
    const total=tax+shippingFee+subTotal
    //get client secret
    const paymentIntent=await fakeStripeAPI({
        amount:total,currency:'usd'
    })

    const order=await Orders.create({Items,total,subTotal,tax,shippingFee,clientSecret:paymentIntent.client_secret,user:req.user.userId})

    res.status(StatusCodes.CREATED).json({order,clientSecret:order.clientSecret})
}

const updateOrder=async (req,res)=>{
    const {id:orderId}=req.params
    const {paymentIntentId}=req.body

    const order=await Orders.findOne({_id:orderId})
    if(!order){
        throw new CustomError.NotFoundError('no order with id')
    }

    checkPermissions(req.user,order.user)
    order.paymentIntentId=paymentIntentId
    order.status='paid'
    

    await order.save()
    res.status(StatusCodes.OK).json({msg:'updated'})
}

module.exports={
    getAllOrders,
    getSingleOrder,
    getCurrentUserOrders,
    createOrder,
    updateOrder
}