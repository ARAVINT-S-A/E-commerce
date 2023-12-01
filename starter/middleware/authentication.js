const CustomError=require('../errors/index')
const {isTokenValid}=require('../utils/index')

const authenticateUser=async (req,res,next)=>{
    const token=req.signedCookies.token
    if(!token){
        throw new CustomError.UnauthenticatedError('no permission')
    }
    try{
    const {name,userId,role}=isTokenValid({token:token})
    req.user={name,userId,role}//we pass this details with req because using this role we can authorize based on whether the user is admin or just user
    next();
    }
    catch(err){
        throw new CustomError.UnauthenticatedError('no permission')
    } 
}

const authorizePermissions=(req,res,next)=>{
    if(req.user.role!=='admin'){
        throw new CustomError.UnauthorizedError('no permission')
    }
    next();
}
module.exports={
    authenticateUser,authorizePermissions
}