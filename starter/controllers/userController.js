const User=require('../models/user')
const {StatusCodes}=require('http-status-codes')
const CustomError=require('../errors/index')


const getAllUsers=async (req,res)=>{
    const users=await User.find({role:'user'}).select('-password')//we remove passwor dand return everyotehr details
    res.status(StatusCodes.OK).json({users})
}

const getSingleUser=async (req,res)=>{
    const {id}=req.params
    const user=await User.findOne({_id:id}).select('-password')
    if(!user){
        throw new CustomError.NotFoundError('no user with id')
    }
    res.status(StatusCodes.OK).json({user})
}

const showCurrentUser=async (req,res)=>{
    res.status(StatusCodes.OK).json({user:req.user})//we just return the user details which we attached with req in authenticate
}

const updateUser=async (req,res)=>{
    res.send('update user')
}

const updateUserPassword=async (req,res)=>{
    const {oldPassword,newPassword}=req.body
    if(!oldPassword || !newPassword){
        throw new CustomError.BadRequestError('provide details')
    }
    const user=await User.findOne({_id:req.user.userId})
    if(!user){
        throw new CustomError.UnauthenticatedError('user not found')
    }
    const isMatch=await user.comparePassword(oldPassword)
    if(!isMatch){
        throw new CustomError.UnauthenticatedError('invalid credentials')
    }
    user.password=newPassword
    await user.save()//instead of updating we can use save method
    res.status(StatusCodes.OK).json({msg:"password updated"})
}


module.exports={
    getAllUsers,
    getSingleUser,
    showCurrentUser,
    updateUser,
    updateUserPassword
}