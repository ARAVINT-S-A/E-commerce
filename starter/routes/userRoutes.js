const express=require('express')

const router=express.Router()
const{getAllUsers,getSingleUser,showCurrentUser,updateUser,updateUserPassword}=require('../controllers/userController')
const {authenticateUser,authorizePermissions}=require('../middleware/authentication')

router.route('/').get(authenticateUser,authorizePermissions('admin','owner'),getAllUsers)

router.route('/showMe').get(authenticateUser,showCurrentUser)//this should be setup above :id route if :id route is before then that 'showMe' would be treated as id then returns error
router.route('/updateUser').patch(updateUser)
router.route('/updateUserPassword').patch(updateUserPassword)

router.route('/:id').get(authenticateUser,getSingleUser)



module.exports=router