import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

// ❗ Fix for __dirname (ESM issue)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Upload directory
const uploadDir = path.join(__dirname, "../uploads");

// Create folder if not exists
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Storage setup
const storage = multer.diskStorage({
    destination: (_req, _file, cb) => {
        cb(null, uploadDir);
    },
    filename: (_req, file, cb) => {
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
        const ext = path.extname(file.originalname);
        cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
    },
});

// Optional file filter (enable if required)
const fileFilter = (_req, file, cb) => {
    const allowedTypes = [".png", ".jpg", ".jpeg", ".webp"];
    const ext = path.extname(file.originalname).toLowerCase();

    if (allowedTypes.includes(ext)) {
        cb(null, true);
    } else {
        cb(new Error("Only images allowed"));
    }
};

// Multer export
export const upload = multer({
    storage,
    // fileFilter,  // enable if needed
});
