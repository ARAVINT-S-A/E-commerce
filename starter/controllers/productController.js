const CustomError=require('../errors/index')
const Product=require('../models/products')
const {StatusCodes}=require('http-status-codes')
const { checkPermissions } = require('../utils')

const createProduct=async(req,res)=>{
    req.body.user=req.user.userId
    const product=await Product.create(req.body)
    res.status(StatusCodes.CREATED).json({product})
}
const getAllProducts=async (req,res)=>{
    const products=await Product.find({});
    res.status(StatusCodes.OK).json({products})
}
const getSingleProducts=async (req,res)=>{
    const {id}= req.params
    const product=await Product.findOne({_id:id})
    if(!product){
        throw new CustomError.NotFoundError('no product found')
    }
    res.status(StatusCodes.OK).json(product)
}
const updateProduct=async (req,res)=>{
    const {id}=req.params
    const product=await Product.findOneAndUpdate({_id:id},req.body,{new:true,runValidators:true})
    res.status(StatusCodes.OK).json({product})
}
const deleteProduct=async (req,res)=>{
    const {id}=req.params
    const product=await Product.findOne({_id:id})
    if(!product){
        throw new CustomError.NotFoundError('no product with id')
    }
    await product.remove()
    res.status(StatusCodes.OK).json("product deleted")
}
const uploadImage=async (req,res)=>{
    res.send('upload')
}


module.exports={
    createProduct,
    getAllProducts,
    getSingleProducts,
    updateProduct,
    deleteProduct,
    uploadImage
}