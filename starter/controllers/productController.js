const CustomError=require('../errors/index')
const Product=require('../models/products')
const {StatusCodes}=require('http-status-codes')
const { checkPermissions } = require('../utils')
const path=require('path')//used to save image inn uploads

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
    const product=await Product.findOne({_id:id}).ppopulate('reviews')

    if(!product){
        throw new CustomError.NotFoundError('no product found')
    }
    res.status(StatusCodes.OK).json(product)
}
const updateProduct=async (req,res)=>{
    const { id: productId } = req.params;

    const product = await Product.findOneAndUpdate({ _id: productId }, req.body, {
      new: true,
      runValidators: true,
    });
  
    if (!product) {
      throw new CustomError.NotFoundError(`No product with id : ${productId}`);
    }
  
    res.status(StatusCodes.OK).json({ product });
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
    if(!req.files){
        throw new CustomError.BadRequestError('no file found')
    }
    const productImage=req.files.image;
    console.log(productImage)
    if(!productImage.mimetype.startsWith('image')){
        throw new CustomError.BadRequestError('upload image')
    }
    const maxSize=1024*1024
    if(productImage.size>maxSize){
        throw new CustomError.BadRequestError('large image size')
    }
    const imagePath=path.join(__dirname,'../public/uploads/'+`${productImage.name}`)
    await productImage.mv(imagePath)//move image to that imagepath
    res.status(StatusCodes.OK).json({image:`/uploads/${productImage.name}`})
}


module.exports={
    createProduct,
    getAllProducts,
    getSingleProducts,
    updateProduct,
    deleteProduct,
    uploadImage
}