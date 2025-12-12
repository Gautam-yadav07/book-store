import express from "express";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";
import { connectDB } from "./db.js";
import dotenv from "dotenv";
dotenv.config();
import bookRoutes from "../routes/book-route.js"
import userRoutes from "../user/routes/user-route.js"

// Fix for __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Static uploads folder
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

connectDB();

app.get("/", (req, res) => {
    res.send("Hello world");
});

//app routes
app.use("/api/book", bookRoutes)
app.use("/api/user", userRoutes)

export default app;
