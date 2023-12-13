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
    const reviews=await Review.find({}).populate({path:'product',select:'name company price'})//we do without populate we will get only the porduct id not the product name so we use populate to get the selected details of the product(specified in path) 
    if(!reviews){
        throw new CustomError.NotFoundError('no reviews')
    }
    res.status(StatusCodes.OK).json({reviews,count:reviews.length})
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
    const {id}=req.params
    const{rating,title,comment}=req.body
    const review =await Review.findOne({_id:id})
    
    if(!review){
        throw new CustomError.NotFoundError('no review with id')
    }

    checkPermissions(req.user,review.user)
    review.rating=rating
    review.title=title
    review.comment=comment
    review.save()
    res.status(StatusCodes.OK).json({review})
}

const deleteReview=async(req,res)=>{
    const{id}=req.params;
    const review=await Review.findOne({_id:id})
    if(!review){
        throw new CustomError.NotFoundError('no review found')
    }
    //console.log(req.user.role)
    checkPermissions({requestUser:req.user,resourceUserId:review.user})
    await review.remove()
    res.status(StatusCodes.OK).json('review deleted')
}

const getSingleProductReviews=async(req,res)=>{
    const{id:productId}=req.params
    const reviews=await Review.find({product:productId})
    res.status(StatusCodes.OK).json({reviews,count:reviews.length})
}

module.exports={
    createReview,
    getAllReviews,
    getSingleReview,
    updateReview,
    deleteReview,
    getSingleProductReviews
}