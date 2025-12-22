import express from "express"
import { addBook, deleteById, getBookById, getBooks, updateById } from "../controllers/book-controller.js"
import { auth } from "../../middlewares/authMiddleware.js"
import { upload } from "../../middlewares/multer.js"
import { isSubAdmin } from "../../middlewares/isSubAdmin.js"

const router = express.Router()

router.post("/add-book", auth,isSubAdmin, upload.array("image"),  addBook)
router.get("/book/:id", auth, isSubAdmin ,getBookById)
router.post("/delete/:id", auth,isSubAdmin, deleteById)
router.patch("/update/:id", auth,isSubAdmin, upload.array("image"), updateById)
router.get("/get-book", auth,isSubAdmin, getBooks)


export default router;