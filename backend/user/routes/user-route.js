import express from 'express'
import { createUser, getById, updateUser, userLogin } from '../controllers/user-controller.js'
import { auth } from '../../middlewares/authMiddleware.js'

const router = express.Router()

router.post("/create", createUser)
router.patch("/update/:id", auth, updateUser)
router.get("/fetch/:id", auth, getById)
router.post("/login", userLogin)



export default router