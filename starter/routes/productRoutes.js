const express=require('express')
const router=express.Router()

const {createProduct,getAllProducts,getSingleProducts,deleteProduct,uploadImage,updateProduct}=require('../controllers/productController')
const { authenticateUser, authorizePermissions } = require('../middleware/authentication')
const {getSingleProductReviews}=require('../controllers/reviewController')

router.route('/').post(authenticateUser,authorizePermissions("admin"),createProduct).get(getAllProducts)
router.route('/uploadimage').post(authenticateUser,authorizePermissions('admin'),uploadImage)
router.route('/:id')
.delete(authenticateUser,authorizePermissions('admin'),deleteProduct)
.patch(authenticateUser,authorizePermissions('admin'),updateProduct)
.get(getSingleProducts)

router.route('/:id/reviews').get(getSingleProductReviews)


module.exports=router