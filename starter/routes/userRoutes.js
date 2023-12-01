const express=require('express')

const router=express.Router()
const{getAllUsers,getSingleUser,showCurrentUser,updateUser,updateUserPassword}=require('../controllers/userController')

router.route('/').get(getAllUsers)

router.route('/showMe').get(showCurrentUser)//this should be setup above :id route if :id route is before then that 'showMe' would be treated as id then returns error
router.route('/updateUser').post(updateUser)
router.route('/updateUserPassword').post(updateUserPassword)

router.route('/:id').get(getSingleUser)



module.exports=router