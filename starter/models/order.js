const mongoose=require('mongoose')

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
    orderItems:[],
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
        required:true
    }

},
{timestamps:true}
)

module.exports=mongoose.model('Order',OrderSchema)