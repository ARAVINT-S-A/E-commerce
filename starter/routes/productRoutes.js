const express=require('express')
const router=express.Router()

const {createProduct,getAllProducts,getSingleProducts,deleteProduct,uploadImage,updateProduct}=require('../controllers/productController')
const { authenticateUser, authorizePermissions } = require('../middleware/authentication')

router.route('/').post(authenticateUser,authorizePermissions("admin"),createProduct).get(getAllProducts)
router.route('/uploadimage').post(authenticateUser,authorizePermissions('admin'),uploadImage)
router.route('/:id').delete(authenticateUser,authorizePermissions('admin'),deleteProduct).patch(authenticateUser,authorizePermissions('admin'),updateProduct).get(getSingleProducts)

module.exports=router