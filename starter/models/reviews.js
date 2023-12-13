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

//we use .statics as we use the function on the model itself if we use the function in a controller then we use schema.methods like we did with compare password
ReviewSchema.statics.calculateAverageRating=async function(productId){
    const result = await this.aggregate([
        { $match: { product: productId } },
        {
          $group: {
            _id: null,
            averageRating: { $avg: '$rating' },
            numOfReviews: { $sum: 1 },
          },
        },
      ]);
    
      try {
        await this.model('Product').findOneAndUpdate(
          { _id: productId },
          {
            averageRating: Math.ceil(result[0]?.averageRating || 0),
            numOfReviews: result[0]?.numOfReviews || 0,
          }
        );
      } catch (error) {
        console.log(error);
      }
}

ReviewSchema.post('save',async function(next){
    await this.constructor.calculateAverageRating(this.product)//calculate avg rating of products 
    console.log('saved review')
})

ReviewSchema.post('remove',async function(next){
    await this.constructor.calculateAverageRating(this.product)//calculate avg rating of products 
    console.log('removed review')
})

module.exports=mongoose.model('Review',ReviewSchema)