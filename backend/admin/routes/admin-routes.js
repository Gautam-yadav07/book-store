import express from "express";
import { createSubAdmin } from "../controllers/create-sub-admin.js";
import { auth } from "../../middlewares/authMiddleware.js";
import { isAdmin } from "../../middlewares/isAdmin.js";
import { AdminLogin, createSuperAdmin, deleteAdmin } from "../controllers/admin-create-and-login.js";

const router = express.Router()

router.post("/create-sub-admin", auth, isAdmin, createSubAdmin)

router.post("/create-admin", createSuperAdmin)
router.post("/login", AdminLogin)
router.delete("/delete", deleteAdmin)


export default router;