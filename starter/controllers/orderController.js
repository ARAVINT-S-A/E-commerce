const CustomError=require('../errors/index')
const {StatusCodes}=require('http-status-codes')
const Orders=require('../models/order')
const Product=require('../models/products')
const {checkPermissions}=require('../utils/index')

const getAllOrders=async(req,res)=>{
    res.send('get all order')
}

const getSingleOrder=async (req,res)=>{
    res.send('get single order')
}

const getCurrentUserOrders=async (req,res)=>{
    res.send('getcurrent user order')
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
console.log(Items)
console.log(subTotal)
    res.send('create oreder')
}

const updateOrder=async (req,res)=>{
    res.send('update order')
}

module.exports={
    getAllOrders,
    getSingleOrder,
    getCurrentUserOrders,
    createOrder,
    updateOrder
}