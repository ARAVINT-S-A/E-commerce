const mongoose=require('mongoose')


const ReviewSchema=new mongoose.Schema(
    {
    rating:{
        type:Number,
        min:1,
        max:5,
        required:[true,'provide review']
    },
    title:{
        type:String,
        trim:true,//to make it short,
        maxlength:100,
        required:[true,'provide title']
    },
    comment:{
        type:String,
        required:[true,'provide comment']
    },
    user:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        required:true
    },
    product:{
        type:mongoose.Types.ObjectId,
        ref:'Product',
        required:true
    }
},{ timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
)

//a user can leave only 1 review per product
ReviewSchema.index({product:1,user:1},{unique:true})

module.exports=mongoose.model('Review',ReviewSchema)