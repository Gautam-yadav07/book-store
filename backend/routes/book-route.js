import express from "express"
import { addBook, deleteById, getBookById, getBooks, updateById } from "../controllers/book-controller.js"
import { auth } from "../middlewares/authMiddleware.js"
import { isAdmin } from "../middlewares/isAdmin.js"
import { upload } from "../middlewares/multer.js"

const router = express.Router()

router.post("/add-book", auth, upload.array("image"), addBook)
router.get("/book/:id", auth, getBookById)
router.post("/delete/:id", auth, deleteById)
router.patch("/update/:id", auth, upload.array("image"), updateById)
router.get("/get-book", getBooks)


export default router;