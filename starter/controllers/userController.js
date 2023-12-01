



const getAllUsers=async (req,res)=>{
    res.send('get all user')
}

const getSingleUser=async (req,res)=>{
    res.send('get single user')
}

const showCurrentUser=async (req,res)=>{
    res.send('show current')
}

const updateUser=async (req,res)=>{
    res.send('update user')
}

const updateUserPassword=async (req,res)=>{
    res.send('update user')
}


module.exports={
    getAllUsers,
    getSingleUser,
    showCurrentUser,
    updateUser,
    updateUserPassword
}