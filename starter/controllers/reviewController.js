const CustomError=require('../errors/index')
const{StatusCodes}=require('http-status-codes')
const Review=require('../models/reviews')

const createReview=async(req,res)=>{
    res.send('create review');
    // if(!req.body){
    //     throw new CustomError.BadRequestError('no review details found')
    // }
    // const review=await Review.create(...req.body)
    // if(!review){
    //     throw new CustomError
    // }
    // res.status(StatusCodes.CREATED).json({review}) 
}

const getAllReviews=async(req,res)=>{
    res.send('get all reviews')
    // const reviews=await Review.find({product:productId})
    // if(!reviews){
    //     throw new CustomError.NotFoundError('no product')
    // }
    // res.status(StatusCodes.OK).json({reviews})
}
const getSingleReview=async(req,res)=>{
    res.send('get single review')
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