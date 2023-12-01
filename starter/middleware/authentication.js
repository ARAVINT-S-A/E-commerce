const CustomError=require('../errors/index')
const {isTokenValid}=require('../utils/index')

const authenticateUser=async (req,res,next)=>{
    const token=req.signedCookies.token
    if(!token){
        throw new CustomError.UnauthenticatedError('no permission')
    }
    try{
    const {name,userId,role}=isTokenValid({token:token})
    req.user={name,userId,role}
    next();
    }
    catch(err){
        throw new CustomError.UnauthenticatedError('no permission')
    } 
}
module.exports={
    authenticateUser
}