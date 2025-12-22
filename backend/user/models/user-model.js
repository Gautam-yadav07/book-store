import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        unique:true,
        trim:true,
        required:true
    },
    password:{
        type:String,
        required:true,
        trim:true
    },
    address:{
        type:String
    },
    mobile:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:["User", "Admin", "SubAdmin"],
        default:"User"
    },
    balance:{
        type:Number,
        default:0
    }
}, {timestamps:true})



export const User = mongoose.model("User", userSchema)