const mongoose=require('mongoose')

const SingleOrderItemSchema=new mongoose.Schema({
    name:{type:String,required:true},
    image:{type:String,required:true},
    price:{type:Number,required:true},
    amount:{type:Number,required:true},//quantity
    product:{
        type:mongoose.Types.ObjectId,
        ref:'Product',
        required:true
    }
})

const OrderSchema=new mongoose.Schema({
    tax:{
        type:Number,
        required:[true,'provide tax']
    },
    shippingFee:{
        type:Number,
        required:[true]
    },
    subTotal:{
        type:Number,
        required:[true]
    },
    total:{
        type:Number,
        required:[true]
    },
    orderItems:[SingleOrderItemSchema],
    status:{
        type:String,
        enum:['pending','delivered','paid','canceled','failed'],
        default:'pending'
    },
    user:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        require:true
    },
    clientSecret:{
        type:String,
        required:true,
    },
    paymentId:{
        type:String,
    }

},
{timestamps:true}
)

module.exports=mongoose.model('Order',OrderSchema)