import { Book } from "../../books/models/book-model"

export const getAllBooks = async(req, res)=>{
    try {
        const book = await Book.find()

        

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Internal server error",
            error:error.message
        })
    }
}