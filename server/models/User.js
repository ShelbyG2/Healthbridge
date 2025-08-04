import mongoose from "mongoose";
import bcrypt from "bcryptjs"




const userSchema = new mongoose.Schema({
    fullname:{
        type:String,
        required:true,
        unique:true,
        lowercade:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        lowercade:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
        minlength:6
    },
    role:{
        type:String,
        required:true,
        enum:['patient','doctor','admin'],
        default:'patient'
    },
    lastlogin:{
        type:Date,
        default:Date.now
    }
},{timestamps:true})


userSchema.pre("save",async function (next){
    if(!this.isModified("password")) return next()
        this.password= await bcrypt.hash(this.password,12)
    next()
})
 userSchema.methods.comparePassword= function (enteredPassword) {
        return bcrypt.compare(enteredPassword,this.password)
 }
export const User = mongoose.model("User",userSchema)