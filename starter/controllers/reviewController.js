const CustomError=require('../errors/index')
const{StatusCodes}=require('http-status-codes')
const Review=require('../models/reviews')
const Product=require('../models/products')
const {checkPermissions}=require('../utils/index')

const createReview=async(req,res)=>{
    const {product:productId}=req.body
    const isValidProduct =await Product.findOne({_id:productId})
    
    if(!isValidProduct){
        throw new CustomError.NotFoundError('no product found')
    }

    const alreadyreviewed=await Review.findOne({user:req.user.userId,product:productId})
    
    if(alreadyreviewed){
        throw new CustomError.BadRequestError('already reviewed')
    }

    req.body.user=req.user.userId

    const review=await Review.create(req.body)

    res.status(StatusCodes.CREATED).json({review}) 
}

const getAllReviews=async(req,res)=>{
    const reviews=await Review.find({})
    if(!reviews){
        throw new CustomError.NotFoundError('no reviews')
    }
    res.status(StatusCodes.OK).json({reviews})
}
const getSingleReview=async(req,res)=>{
    const{id}=req.params;
    const review=await Review.findOne({_id:id})
    if(!review){
        throw new CustomError.NotFoundError('no review with id')
    }
    res.status(StatusCodes.OK).json({review})
}

const updateReview=async(req,res)=>{
    res.send('update review')
}

const deleteReview=async(req,res)=>{
    res.send('delete review')
}

module.exports={
    createReview,
    getAllReviews,
    getSingleReview,
    updateReview,
    deleteReview
}