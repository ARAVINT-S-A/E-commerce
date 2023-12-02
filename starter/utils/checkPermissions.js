const CustomError=require('../errors/index')
const checkPermissions=({requestuser,resourceuserId})=>{
    const requestuserId=requestuser.requestuserId
    if(requestuserId!=resourceuserId){
        throw new CustomError.UnauthorizedError('cant view other users profile')
    }
    
}
module.exports={checkPermissions}