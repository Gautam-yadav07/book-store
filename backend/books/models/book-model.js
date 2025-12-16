import mongoose from 'mongoose'

const bookSchema = mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true
    },
    publishYear:{
        type:Number,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    description:{
        type:String
    },
    category:{
        type:String,
        required:true
    },
    image:{
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Media" }]
    },
    stock:{
        type:String,
        enum:["In-Stock", "Out of Stock"]
    },
    ratings:{
        type:Number,
        default:0
    },

},{timestamps:true})


export const Book = new mongoose.model("Book", bookSchema)