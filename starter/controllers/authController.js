const User=require('../models/user')
const {StatusCodes}=require('http-status-codes')
const CustomError=require('../errors/index')
const{createTokenUser,attachCookiesToResponse}=require('../utils/index')
const register=async(req,res)=>{
    const {name,email,password}=req.body//we r not directly entering req.body in create because of safety as if user gives his role as admin then it would be stored in db but that privilege should not be given to user 
 
    const isFirstAccount=await User.countDocuments({})===0

    const role= isFirstAccount ? 'admin':'user';//if else statement

    const user=await User.create({name,email,password,role})

    if(!user){
        throw new CustomError.BadRequestError('provide details')
    }

    const tokenUser=createTokenUser({user})

    attachCookiesToResponse({res,user:tokenUser})
    // const token=createJWT({payload:tokenUser})

    res.status(StatusCodes.CREATED).json({user})

}
const login=async(req,res)=>{
    const {email,password}=req.body
    if(!email || !password){
        throw new CustomError.BadRequestError('provide details')
    }
    const user=await User.findOne({email:email})
    if(!user){
        throw new CustomError.UnauthenticatedError('invalid credentials')
    }
    const isMatch=await user.comparePassword(password)
    if(!isMatch){
        throw new CustomError.UnauthenticatedError('invalid password')
    }
    //is password crct
    const tokenUser=createTokenUser({user})
    attachCookiesToResponse({res,user:tokenUser})
    res.status(StatusCodes.OK).json({tokenUser})
}
const logout=async(req,res)=>{
    res.cookie('token','logout',{
        httpOnly:true,
        expires:new Date(Date.now())//as we are logging out we are setting the value of the cookie named token as some random string value
    })
    res.status(StatusCodes.OK)
}

module.exports={
    register,
    login,
    logout    
}