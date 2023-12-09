const express=require('express')
const router=express.Router()

const {createProduct,getAllProducts,getSingleProducts,deleteProduct,uploadImage}=require('../controllers/productController')
const { authenticateUser, authorizePermissions } = require('../middleware/authentication')

router.route('/createproduct').post(authenticateUser,authorizePermissions(),createProduct)
router.route('/deleteproduct').patch(authenticateUser,authorizePermissions(),deleteProduct)
router.route('/uploadimage').post(authenticateUser,authorizePermissions(),uploadImage)
router.route('/getallproducts').post(authenticateUser,getAllProducts)
router.route('/getsingleproducts').post(authenticateUser,getSingleProducts)

module.exports=router