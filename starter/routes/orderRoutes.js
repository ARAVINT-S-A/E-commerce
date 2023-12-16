const express=require('express')
const {getAllOrders,getSingleOrder,getCurrentUserOrders,createOrder,updateOrder}= require('../controllers/orderController')
const router=express.Router()

router.route('/').get(getAllOrders).post(createOrder)
router.route('/showAllMyOrders').get(getCurrentUserOrders)
router.route('/:id').get(getSingleOrder).patch(updateOrder)

module.exports=router
