const CustomError=require('../errors/index')
const Product=require('../models/products')
const {StatusCodes}=require('http-status-codes')

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
    res.send('get single products')
}
const updateProduct=async (req,res)=>{
    res.send('update')
}
const deleteProduct=async (req,res)=>{
    res.send('delete')
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