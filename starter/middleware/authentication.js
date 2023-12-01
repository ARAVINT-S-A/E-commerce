const CustomError=require('../errors/index')
const {isTokenValid}=require('../utils/index')

const authenticateUser=async (req,res,next)=>{
    const token=req.signedCookies.token
    const isValid=isTokenValid({token:token})
    if(!isValid){
        throw new CustomError.UnauthenticatedError('no permission')
    }
    next();
}
module.exports={
    authenticateUser
}