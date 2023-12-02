const CustomError=require('../errors/index')
const checkPermissions=({requestuserId,resourceuserId})=>{
    // console.log(requestuserId)
    // console.log(resourceuserId)
    if(requestuserId!=resourceuserId){
        throw new CustomError.UnauthorizedError('cant view other users profile')
    }

}
module.exports={checkPermissions}