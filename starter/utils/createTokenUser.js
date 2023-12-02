const createTokenUser=({user})=>{
    return {name:user.name,userid:user._id,role:user.role}
}
module.exports={
    createTokenUser
}