import { deleteUploadedFileById } from "../media/utils/delete-by-id.js";
import { saveUploadedFile } from "../media/utils/save-uploaded-file.js";
import { Book } from "../models/book-model.js"
import mongoose from "mongoose"

export const addBook = async (req, res)=>{
    try {
        const {title, author, publishYear, price, description, category, stock}=req.body
        const uploadedFile = req.files;
        let mediaIds = []
        if(!title || !author|| !publishYear||!price ||!category || !stock){
            return res.status(400).json({
                success:false,
                messsage:"All the fields are required"
            })
        }

        if (uploadedFile && Array.isArray(uploadedFile)) {
        const uploads = await Promise.all(
            uploadedFile.map(async (file) => {
                const media = await saveUploadedFile(file);
                return new mongoose.Types.ObjectId(media._id);
            })
        );

        mediaIds = uploads;
    }


        const newBook =  new Book({
            title,
            author,
            publishYear,
            price,
            description,
            category,
            stock,
            image:mediaIds

        })
        await newBook.save()
        return res.status(201).json({
            success:true,
            message:"Book created succesfully",
            data:newBook
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Internal server error",
            error: error.message
        })
        
    }
}


export const getBooks = async(req, res)=>{
    try {
        const allBooks = await Book.find().populate("image","fileLocation")
        if(!allBooks){
            return res.status(404).json({
                success:false,
                message:"No books found",
            })
        }
        return res.status(200).json({
            success:true,
            message:"All the books fetched succesfully",
            data:allBooks
        })
        
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Internal server error",
            error:error.message
        })
        
    }
}

export const getBookById = async(req, res)=>{
    try {
        const {id} = req.params
        const book = await Book.findById(id).populate("image", "fileLocation")
        if(!book){
            return res.status(400).json({
                success:false,
                message:"Book not found"
            })
        }
        return res.status(200).json({
            success:true,
            message:"Book Fetched succesfully",
            data:book
        })
        
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Internal server error",
            error:error.message
        })
    }
}


export const deleteById = async(req, res)=>{
    try {
        const {id} = req.params
        const book = await Book.findById(id)
        if(!book){
            return res.status(400).json({
                success:false,
                message:"Book record not found"
            })
        }

         if (book.image && book.image.length > 0) {
            await Promise.all(
                book.image.map(async (mediaId) => {
                    await deleteUploadedFileById(mediaId);
                })
            );
        }

        await Book.findByIdAndDelete(id)
        return res.status(200).json({
            success:true,
            message:"Book record is deleted succesfully"
        })
        
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Internal server error",
            error:error.message
        })
    }
}


export const updateById = async(req, res)=>{
    try {
        const {id} = req.params
        const update = req.body             //feilds you want to update
        const uploadedFiles = req.files      //new image

        const book  = await Book.findById(id)
        if(!book){
            return res.status(400).json({
                success:false,
                message:"No book found"
            })
        }

        if(uploadedFiles && uploadedFiles.length > 0){
            if(book.image.length >0){
                await Promise.all(
                    book.image.map(async (mediaId)=>{
                        await deleteUploadedFileById(mediaId)
                    })
                )
            }

            const newMediaId = await Promise.all(
                uploadedFiles.map(async (file)=>{
                   const saved =  await saveUploadedFile(file)
                   return saved._id
                })
            )

            book.image = newMediaId
        }

        Object.keys(update).forEach((key)=>{
            if (update[key] !== undefined && update[key] !==""){
                book[key]= update[key]

            }
        })


        await book.save()

        return res.status(200).json({
            success:true,
            message:"Book record updated succesfully",
            book
        })
        
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Internal server error",
            error:error.message
        })
        
    }
}