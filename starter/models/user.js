const mongoose=require('mongoose')
const bcrypt=require('bcryptjs')
const validator=require('validator')
const UserSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,'provide name'],
    },
    email:{
        type:String,
        required:[true,'provide email'],
        validate:{
            validator:validator.isEmail,//using validator package to validate the email format
            message:'please provide valid email'
        },
        unique:true
    },
    password:{
        type:String,
        required:[true,'provide password']
    },
    role:{
        type:String,
        enum:['admin','user'],
        default:'user'
    }
})
UserSchema.pre('save',async function(next){
    const salt=await bcrypt.genSalt(10);
    this.password=await bcrypt.hash(this.password,salt)
    next()
})
//password validation(this is a static method)
UserSchema.methods.comparePassword=async function(candidatePassword){
    const isMatch=await bcrypt.compare(candidatePassword,this.password)
    return isMatch;
}
module.exports=mongoose.model('User',UserSchema)