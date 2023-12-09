const CustomError=require('../errors/index')
const Product=require('../models/products')
const createProduct=async(req,res)=>{
    res.send('create')
}
const getAllProducts=async (req,res)=>{
    res.send('get all products')
}
const getSingleProducts=async (req,res)=>{
    res.send('get single products')
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
    deleteProduct,
    uploadImage
}